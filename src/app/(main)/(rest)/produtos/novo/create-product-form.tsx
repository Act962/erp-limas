"use client";

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
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useCategory } from "@/context/category/hooks/use-categories";
import { ProductUnit } from "@/generated/prisma/enums";
import { orpc } from "@/lib/orpc";
import { ProductSchema, ProductType } from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

export function CreateProductForm() {
  const form = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      description: "",
      sku: "",
      barcode: "",
      unit: ProductUnit.UN,
      costPrice: 0,
      salePrice: 0,
      currentStock: 0,
      minStock: 0,
      maxStock: 0,
      location: "",
      images: [],
      thumbnail: "",
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      isActive: true,
      isFeatured: false,
      trackStock: true,
    },
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string>("");

  const { categories, isLoadingCategories } = useCategory();

  const mutation = useMutation(
    orpc.products.create.mutationOptions({
      onSuccess: () => {
        router.push("/produtos");

        queryClient.invalidateQueries(orpc.products.list.queryOptions());
      },
      onError: (error) => {
        console.log("Error Cliente: ", error);
        toast.error(error.message);
      },
    })
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue("thumbnail", reader.result as string);
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (data: ProductType) => {
    mutation.mutate({
      name: data.name,
      description: data.description,
      sku: data.sku,
      unit: ProductUnit.KG,
      costPrice: data.costPrice,
      salePrice: data.salePrice,
      currentStock: data.currentStock,
      categoryId: data.categoryId,
      minStock: data.minStock,
      maxStock: data.maxStock,
      location: data.location,
      images: data.images,
      thumbnail: data.thumbnail,
      weight: data.weight,
      length: data.length,
      width: data.width,
      height: data.height,
      isActive: data.isActive,
      isFeatured: data.isFeatured,
      trackStock: data.trackStock,
      barcode: data.barcode,
    });
  };

  const isCreating = mutation.isPending;

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* ---- INFORMAÇÕES BÁSICAS ---- */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nome do Produto <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ex: Notebook Dell Inspiron 15"
                    disabled={isCreating}
                    {...form.register("name")}
                  />
                  <FieldError>{form.formState.errors.name?.message}</FieldError>
                </div>

                {/* Categoria */}
                <div className="space-y-2">
                  <Label htmlFor="categoryId">Categoria</Label>

                  <Select
                    value={form.watch("categoryId")}
                    onValueChange={(value) =>
                      form.setValue("categoryId", value)
                    }
                  >
                    <SelectTrigger
                      disabled={isCreating}
                      id="categoryId"
                      className="w-full"
                    >
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingCategories ? (
                        <SelectItem value="loading">Carregando...</SelectItem>
                      ) : (
                        categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FieldError>
                    {form.formState.errors.categoryId?.message}
                  </FieldError>
                </div>
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o produto em detalhes..."
                  rows={4}
                  disabled={isCreating}
                  {...form.register("description")}
                />
                <FieldError>
                  {form.formState.errors.description?.message}
                </FieldError>
              </div>

              {/* SKU / BARCODE / UNIT */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    placeholder="NB-001"
                    disabled={isCreating}
                    {...form.register("sku")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="barcode">Código de Barras</Label>
                  <Input
                    id="barcode"
                    placeholder="7891234567890"
                    disabled={isCreating}
                    {...form.register("barcode")}
                  />
                </div>

                {/* UNIDADE */}
                <div className="space-y-2">
                  <Label htmlFor="unit">Unidade</Label>
                  <Select
                    value={form.watch("unit")}
                    onValueChange={(value) =>
                      form.setValue("unit", value as ProductUnit)
                    }
                    disabled={isCreating}
                  >
                    <SelectTrigger id="unit" disabled={isCreating}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {unidades.map((unit) => (
                        <SelectItem key={unit.code} value={unit.code}>
                          {unit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ---- PREÇOS E ESTOQUE ---- */}
          <Card>
            <CardHeader>
              <CardTitle>Preços e Estoque</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preços */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="costPrice">
                    Preço de Custo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="costPrice"
                    type="number"
                    step="0.01"
                    disabled={isCreating}
                    placeholder="0,00"
                    {...form.register("costPrice", { valueAsNumber: true })}
                  />
                  <FieldError>
                    {form.formState.errors.costPrice?.message}
                  </FieldError>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salePrice">
                    Preço de Venda <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="salePrice"
                    type="number"
                    step="0.01"
                    disabled={isCreating}
                    placeholder="0,00"
                    {...form.register("salePrice", { valueAsNumber: true })}
                  />
                  <FieldError>
                    {form.formState.errors.salePrice?.message}
                  </FieldError>
                </div>

                <div className="space-y-2">
                  <Label>Margem de Lucro</Label>
                  <Input
                    value={
                      form.watch("costPrice") > 0
                        ? (
                            ((form.watch("salePrice") -
                              form.watch("costPrice")) /
                              form.watch("costPrice")) *
                            100
                          ).toFixed(2) + "%"
                        : "0.00%"
                    }
                    placeholder="0.00%"
                    disabled
                  />
                </div>
              </div>

              {/* Estoque */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="currentStock">Estoque Inicial</Label>
                  <Input
                    id="currentStock"
                    type="number"
                    placeholder="0"
                    disabled={isCreating}
                    {...form.register("currentStock", { valueAsNumber: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minStock">Estoque Mínimo</Label>
                  <Input
                    id="minStock"
                    type="number"
                    placeholder="0"
                    disabled={isCreating}
                    {...form.register("minStock", { valueAsNumber: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    placeholder="Ex: Prateleira 1"
                    disabled={isCreating}
                    {...form.register("location")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ----------- COLUNA LATERAL ----------- */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Imagem do Produto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                {/* PREVIEW */}
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
                      asChild
                      className="w-full"
                    >
                      <span>Upload</span>
                    </Button>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isCreating}
                      onChange={(e) => {
                        handleImageChange(e);
                      }}
                    />
                  </Label>

                  {imagePreview && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={isCreating}
                      onClick={() => {
                        setImagePreview("");
                        form.setValue("thumbnail", "");
                      }}
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
              {/* isActive */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isActive">Produto Ativo</Label>
                  <p className="text-xs text-muted-foreground">
                    Disponível para venda
                  </p>
                </div>
                <Switch
                  disabled={isCreating}
                  checked={form.watch("isActive")}
                  onCheckedChange={(v) => form.setValue("isActive", v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isActive">Controlar Estoque</Label>
                  <p className="text-xs text-muted-foreground">
                    Rastrear quantidade
                  </p>
                </div>
                <Switch
                  disabled={isCreating}
                  checked={form.watch("trackStock")}
                  onCheckedChange={(v) => form.setValue("trackStock", v)}
                />
              </div>

              {/* isFeatured */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isActive">Exibir no Catálogo Online</Label>
                  <p className="text-xs text-muted-foreground">
                    Visível para clientes
                  </p>
                </div>
                <Switch
                  disabled={isCreating}
                  checked={form.watch("isFeatured")}
                  onCheckedChange={(v) => form.setValue("isFeatured", v)}
                />
              </div>
            </CardContent>
          </Card>

          {/* AÇÕES */}
          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating && <Spinner />}
              Salvar Produto
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent"
              disabled={isCreating}
            >
              <Link href="/produtos">Cancelar</Link>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
