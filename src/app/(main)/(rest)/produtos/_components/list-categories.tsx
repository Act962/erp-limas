"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  ChevronRight,
  FolderOpen,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const categories = [
  {
    id: 1,
    name: "Eletrônicos",
    slug: "eletronicos",
    productsCount: 45,
    children: [
      { id: 11, name: "Notebooks", slug: "notebooks", productsCount: 15 },
      { id: 12, name: "Tablets", slug: "tablets", productsCount: 8 },
      { id: 13, name: "Smartphones", slug: "smartphones", productsCount: 22 },
    ],
  },
  {
    id: 2,
    name: "Periféricos",
    slug: "perifericos",
    productsCount: 78,
    children: [
      { id: 21, name: "Mouses", slug: "mouses", productsCount: 25 },
      { id: 22, name: "Teclados", slug: "teclados", productsCount: 30 },
      { id: 23, name: "Headsets", slug: "headsets", productsCount: 23 },
    ],
  },
  {
    id: 3,
    name: "Monitores",
    slug: "monitores",
    productsCount: 32,
    children: [],
  },
  {
    id: 4,
    name: "Webcams",
    slug: "webcams",
    productsCount: 12,
    children: [],
  },
  {
    id: 5,
    name: "Audio",
    slug: "audio",
    productsCount: 28,
    children: [
      { id: 51, name: "Caixas de Som", slug: "caixas-som", productsCount: 15 },
      { id: 52, name: "Fones de Ouvido", slug: "fones", productsCount: 13 },
    ],
  },
];

export function ListCategories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<number[]>([
    1, 2, 5,
  ]);

  const toggleExpand = (id: number) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };
  return (
    <Card>
      <CardHeader>
        <InputGroup>
          <InputGroupAddon>
            <Search className="h-4 w-4" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Buscar categorias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id}>
              <div className="group flex items-center justify-between rounded-lg border p-4 hover:bg-accent">
                <div className="flex items-center gap-3">
                  {category.children.length > 0 ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => toggleExpand(category.id)}
                    >
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          expandedCategories.includes(category.id)
                            ? "rotate-90"
                            : ""
                        }`}
                      />
                    </Button>
                  ) : (
                    <div className="w-6" />
                  )}
                  <FolderOpen className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{category.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Slug: {category.slug}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="secondary">
                    {category.productsCount} produtos
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar subcategoria
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {expandedCategories.includes(category.id) &&
                category.children.length > 0 && (
                  <div className="ml-9 mt-2 space-y-2">
                    {category.children.map((child) => (
                      <div
                        key={child.id}
                        className="group flex items-center justify-between rounded-lg border border-dashed p-3 hover:bg-accent"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6" />
                          <FolderOpen className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">
                              {child.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Slug: {child.slug}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            {child.productsCount} produtos
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 opacity-0 group-hover:opacity-100"
                              >
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Pencil className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
