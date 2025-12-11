"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Save, Upload, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateProductForm() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    router.push("/produtos");
  };
  return (
    <form onSubmit={handleSubmit}>
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
                    Nome do Produto <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ex: Notebook Dell Inspiron 15"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Categoria <span className="text-destructive">*</span>
                  </Label>
                  <Select name="category" required>
                    <SelectTrigger id="category" className="w-full">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eletronicos">Eletrônicos</SelectItem>
                      <SelectItem value="perifericos">Periféricos</SelectItem>
                      <SelectItem value="monitores">Monitores</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="webcams">Webcams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Descreva o produto em detalhes..."
                  rows={4}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="sku">
                    SKU <span className="text-destructive">*</span>
                  </Label>
                  <Input id="sku" name="sku" placeholder="NB-001" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="barcode">Código de Barras</Label>
                  <Input
                    id="barcode"
                    name="barcode"
                    placeholder="7891234567890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unidade</Label>
                  <Select name="unit" defaultValue="un">
                    <SelectTrigger id="unit" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="un">Unidade</SelectItem>
                      <SelectItem value="kg">Quilograma</SelectItem>
                      <SelectItem value="lt">Litro</SelectItem>
                      <SelectItem value="mt">Metro</SelectItem>
                      <SelectItem value="cx">Caixa</SelectItem>
                    </SelectContent>
                  </Select>
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
                    name="costPrice"
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salePrice">
                    Preço de Venda <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="salePrice"
                    name="salePrice"
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="margin">Margem de Lucro</Label>
                  <Input
                    id="margin"
                    name="margin"
                    type="number"
                    step="0.01"
                    placeholder="0%"
                    disabled
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="currentStock">
                    Estoque Inicial <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="currentStock"
                    name="currentStock"
                    type="number"
                    placeholder="0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">
                    Estoque Mínimo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="minStock"
                    name="minStock"
                    type="number"
                    placeholder="0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Ex: Prateleira A-12"
                  />
                </div>
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
                        Upload
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
                  {imagePreview && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setImagePreview("")}
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
                <Switch id="isActive" name="isActive" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="trackStock">Controlar Estoque</Label>
                  <p className="text-xs text-muted-foreground">
                    Rastrear quantidade
                  </p>
                </div>
                <Switch id="trackStock" name="trackStock" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allowNegative">
                    Permitir Estoque Negativo
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Vender sem estoque
                  </p>
                </div>
                <Switch id="allowNegative" name="allowNegative" />
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
                <Switch
                  id="showOnCatalog"
                  name="showOnCatalog"
                  defaultChecked
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Salvando..." : "Salvar Produto"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent"
            >
              <Link href="/produtos">Cancelar</Link>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
