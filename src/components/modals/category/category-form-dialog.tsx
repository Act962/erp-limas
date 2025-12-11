"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Category = {
  id?: number;
  name: string;
  slug: string;
  description: string;
  parentId?: number;
};

interface CategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
  mode: "create" | "edit";
  parentCategory?: { id: number; name: string } | null;
}

export function CategoryFormDialog({
  open,
  onOpenChange,
  category,
  mode,
  parentCategory,
}: CategoryFormDialogProps) {
  const [formData, setFormData] = useState<Category>({
    name: "",
    slug: "",
    description: "",
    parentId: undefined,
  });

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        parentId: parentCategory?.id,
      });
    }
  }, [category, parentCategory, open]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleNameChange = (name: string) => {
    setFormData({ ...formData, name, slug: generateSlug(name) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Submitting category:", formData);
    // TODO: Implement API call to save category
    onOpenChange(false);
  };

  const title =
    mode === "create"
      ? parentCategory
        ? `Nova Subcategoria em "${parentCategory.name}"`
        : "Nova Categoria"
      : "Editar Categoria";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Preencha os dados para criar uma nova categoria"
              : "Atualize as informações da categoria"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome da Categoria *</Label>
              <Input
                id="name"
                placeholder="Ex: Eletrônicos"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                placeholder="eletronicos"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                URL amigável gerada automaticamente do nome
              </p>
            </div>

            {!parentCategory && (
              <div>
                <Label htmlFor="parentId">Categoria Pai (Opcional)</Label>
                <Select
                  value={formData.parentId?.toString()}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      parentId: Number.parseInt(value),
                    })
                  }
                >
                  <SelectTrigger id="parentId">
                    <SelectValue placeholder="Nenhuma (Categoria principal)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">
                      Nenhuma (Categoria principal)
                    </SelectItem>
                    <SelectItem value="1">Eletrônicos</SelectItem>
                    <SelectItem value="2">Periféricos</SelectItem>
                    <SelectItem value="3">Monitores</SelectItem>
                    <SelectItem value="5">Audio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva a categoria..."
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {mode === "create" ? "Criar Categoria" : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
