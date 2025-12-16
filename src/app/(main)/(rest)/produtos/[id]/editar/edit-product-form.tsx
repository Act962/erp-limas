"use client";

import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCategory } from "@/context/category/hooks/use-categories";
import { ProductUnit } from "@/generated/prisma/enums";
import { orpc } from "@/lib/orpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const unidades = [
  { code: "UN", name: "Unidade" },
  { code: "KG", name: "Quilograma" },
  { code: "G", name: "Grama" },
  { code: "L", name: "Litro" },
  { code: "ML", name: "Mililitro" },
  { code: "M", name: "Metro" },
  { code: "M2", name: "Metro Quadrado" },
  { code: "M3", name: "Metro Cúbico" },
  { code: "CX", name: "Caixa" },
  { code: "PC", name: "Peça" },
  { code: "PAR", name: "Par" },
  { code: "DZ", name: "Dúzia" },
];

const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  categoryId: z.string().optional(),
  description: z.string().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  unit: z.enum(ProductUnit).optional(),
  costPrice: z.coerce.number().min(0, "Preço de custo deve ser positivo"),
  salePrice: z.coerce.number().min(0, "Preço de venda deve ser positivo"),
  minStock: z.coerce.number().min(0, "Estoque mínimo deve ser positivo"),
  isActive: z.boolean(),
  trackStock: z.boolean(),
  showOnCatalog: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function EditProductForm() {
  const router = useRouter();
  const { id: productId } = useParams<{ id: string }>();
  const {
    data: { product },
  } = useSuspenseQuery(
    orpc.products.get.queryOptions({
      input: {
        id: productId,
      },
    })
  );

  const updateProductMutation = useMutation(
    orpc.products.update.mutationOptions({
      onSuccess: () => {
        toast.success("Produto atualizado com sucesso!");
        router.push(`/produtos`);
      },
      onError: () => {
        return toast.error("Erro ao atualizar o produto.");
      },
    })
  );

  const { categories, isLoadingCategories } = useCategory();

  const [imagePreview, setImagePreview] = useState<string>(product.images[0]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,
    defaultValues: {
      name: product.name,
      categoryId: product.categoryId || "",
      description: product.description || "",
      sku: product.sku || "",
      barcode: product.barcode || "",
      unit: product.unit || "UN",
      costPrice: product.costPrice,
      salePrice: product.salePrice,
      minStock: product.minStock,
      isActive: product.isActive,
      trackStock: product.trackStock,
      showOnCatalog: product.isFeatured, // Mapping isFeatured to showOnCatalog
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const costPrice = watch("costPrice");
  const salePrice = watch("salePrice");

  const margin =
    costPrice > 0 ? ((salePrice - costPrice) / costPrice) * 100 : 0;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    updateProductMutation.mutate({
      id: productId,
      ...data,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Editar Produto"
        description={`Editando: ${product.name}`}
      >
        <Button size={"sm"} variant="outline" asChild>
          <Link href={`/produtos/${product.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
      </PageHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Nome do Produto{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Digite o nome do produto"
                      {...register("name")}
                      aria-invalid={!!errors.name}
                    />
                    <FieldError>{errors.name?.message}</FieldError>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Categoria <span className="text-destructive">*</span>
                    </Label>
                    <Controller
                      name="categoryId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger id="category" className="w-full">
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {isLoadingCategories ? (
                              <SelectItem value="loading" disabled>
                                Carregando...
                              </SelectItem>
                            ) : (
                              categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.categoryId && (
                      <p className="text-sm text-destructive">
                        {errors.categoryId.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    {...register("description")}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="sku">
                      SKU <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="sku"
                      {...register("sku")}
                      aria-invalid={!!errors.sku}
                    />
                    {errors.sku && (
                      <p className="text-sm text-destructive">
                        {errors.sku.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Código de Barras</Label>
                    <Input id="barcode" {...register("barcode")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">
                      Unidade <span className="text-destructive">*</span>
                    </Label>
                    <Controller
                      name="unit"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger id="unit" className="w-full">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {unidades.map((unit) => (
                              <SelectItem key={unit.code} value={unit.code}>
                                {unit.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.unit && (
                      <p className="text-sm text-destructive">
                        {errors.unit.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preços e Estoque</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="costPrice">
                      Preço de Custo <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="costPrice"
                      type="number"
                      step="0.01"
                      {...register("costPrice")}
                      aria-invalid={!!errors.costPrice}
                    />
                    {errors.costPrice && (
                      <p className="text-sm text-destructive">
                        {errors.costPrice.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salePrice">
                      Preço de Venda <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="salePrice"
                      type="number"
                      step="0.01"
                      {...register("salePrice")}
                      aria-invalid={!!errors.salePrice}
                    />
                    {errors.salePrice && (
                      <p className="text-sm text-destructive">
                        {errors.salePrice.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="margin">Margem de Lucro</Label>
                    <Input
                      id="margin"
                      type="number"
                      value={margin.toFixed(2)}
                      disabled
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="currentStock">Estoque Atual</Label>
                    <Input
                      id="currentStock"
                      type="number"
                      defaultValue={product.currentStock}
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">
                      Use movimentações para alterar o estoque
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minStock">
                      Estoque Mínimo <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="minStock"
                      type="number"
                      {...register("minStock")}
                      aria-invalid={!!errors.minStock}
                    />
                    {errors.minStock && (
                      <p className="text-sm text-destructive">
                        {errors.minStock.message}
                      </p>
                    )}
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="location">Localização</Label>
                    <Input id="location" {...register("location")} />
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Imagem do Produto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-40 w-40 rounded-lg">
                    <AvatarImage
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                    />
                    <AvatarFallback className="rounded-lg bg-muted">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex gap-2 w-full">
                    <Label htmlFor="image-upload" className="flex-1">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full bg-transparent"
                        asChild
                      >
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Alterar
                        </span>
                      </Button>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </Label>
                    {imagePreview && imagePreview !== product.images[0] && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setImagePreview(product.images[0])}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Formatos aceitos: JPG, PNG, GIF
                    <br />
                    Tamanho máximo: 5MB
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="isActive">Produto Ativo</Label>
                    <p className="text-xs text-muted-foreground">
                      Disponível para venda
                    </p>
                  </div>
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        id="isActive"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="trackStock">Controlar Estoque</Label>
                    <p className="text-xs text-muted-foreground">
                      Rastrear quantidade
                    </p>
                  </div>
                  <Controller
                    name="trackStock"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        id="trackStock"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="showOnCatalog">
                      Exibir no Catálogo Online
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Visível para clientes
                    </p>
                  </div>
                  <Controller
                    name="showOnCatalog"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        id="showOnCatalog"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent"
                asChild
              >
                <Link href={`/produtos/${product.id}`}>Cancelar</Link>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
