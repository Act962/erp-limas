"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus, Minus, Plus } from "lucide-react";
import { Category, FiltersCatalog } from "./filters";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMemo, useState } from "react";
import { useQueryState } from "nuqs";

interface Product {
  id: string;
  name: string;
  salePrice: number;
  images: string[];
  categorySlug: string;
}

export function Catalogo() {
  const [categoryParam] = useQueryState("category");

  const mockedProducts: Product[] = [
    {
      id: "1",
      name: "Notebook Gamer RTX 4050",
      salePrice: 5899.9,
      images: ["https://picsum.photos/400/400?random=1"],
      categorySlug: "notebooks",
    },
    {
      id: "2",
      name: "Mouse Sem Fio Logitech MX",
      salePrice: 249.9,
      images: ["https://picsum.photos/400/400?random=2"],
      categorySlug: "perifericos",
    },
    {
      id: "3",
      name: "Teclado Mecânico RGB",
      salePrice: 399.99,
      images: ["https://picsum.photos/400/400?random=3"],
      categorySlug: "perifericos",
    },
    {
      id: "4",
      name: 'Monitor 27" Full HD',
      salePrice: 1299.0,
      images: ["https://picsum.photos/400/400?random=4"],
      categorySlug: "monitores",
    },
    {
      id: "5",
      name: "Headset Gamer 7.1",
      salePrice: 799.9,
      images: ["https://picsum.photos/400/400?random=5"],
      categorySlug: "audio",
    },
    {
      id: "6",
      name: "SSD NVMe 1TB",
      salePrice: 699.9,
      images: ["https://picsum.photos/400/400?random=6"],
      categorySlug: "armazenamento",
    },
    {
      id: "7",
      name: "Cadeira Gamer Ergonômica",
      salePrice: 1599.0,
      images: ["https://picsum.photos/400/400?random=7"],
      categorySlug: "moveis-gamer",
    },
    {
      id: "8",
      name: "Webcam Full HD",
      salePrice: 299.9,
      images: ["https://picsum.photos/400/400?random=8"],
      categorySlug: "acessorios",
    },
    {
      id: "9",
      name: "Caixa de Som Bluetooth",
      salePrice: 349.9,
      images: ["https://picsum.photos/400/400?random=9"],
      categorySlug: "audio",
    },
    {
      id: "0",
      name: "Smartphone Android 128GB",
      salePrice: 2499.0,
      images: ["https://picsum.photos/400/400?random=10"],
      categorySlug: "smartphones",
    },
  ];
  const mockedCategories: Category[] = [
    {
      id: "cat_01",
      name: "Informática",
      categorySlug: "informatica",
      description: "Produtos de informática e acessórios",
    },
    {
      id: "cat_02",
      name: "Periféricos",
      categorySlug: "perifericos",
      description: "Teclados, mouses e acessórios",
    },
    {
      id: "cat_03",
      name: "Monitores",
      categorySlug: "monitores",
      description: "Monitores e telas profissionais",
    },
    {
      id: "cat_04",
      name: "Notebooks",
      categorySlug: "notebooks",
      description: "Notebooks e laptops",
    },
    {
      id: "cat_05",
      name: "Gamers",
      categorySlug: "gamers",
      description: "Produtos para setup gamer",
    },
    {
      id: "cat_06",
      name: "Smartphones",
      categorySlug: "smartphones",
      description: "Celulares e acessórios",
    },
    {
      id: "cat_07",
      name: "Áudio",
      categorySlug: "audio",
      description: "Fones, caixas de som e headsets",
    },
    {
      id: "cat_08",
      name: "Armazenamento",
      categorySlug: "armazenamento",
      description: "HDs, SSDs e cartões de memória",
    },
    {
      id: "cat_09",
      name: "Móveis Gamer",
      categorySlug: "moveis-gamer",
      description: "Cadeiras e mesas gamer",
    },
    {
      id: "cat_10",
      name: "Acessórios",
      categorySlug: "acessorios",
      description: "Cabos, suportes e adaptadores",
    },
  ];

  const filteredProducts = useMemo(() => {
    if (!categoryParam) {
      return mockedProducts;
    }

    const selectedSlugs = categoryParam.split(",").map((s) => s.trim());

    return mockedProducts.filter((product) =>
      selectedSlugs.includes(product.categorySlug)
    );
  }, [categoryParam]);

  return (
    <main className="w-full flex items-center justify-center py-5">
      <div className="max-w-[1280px] flex flex-col w-full justify-between px-3">
        <div className="flex flex-row w-full items-center justify-between gap-x-3 py-6">
          {categoryParam && (
            <div className="mb-4 text-sm text-muted-foreground">
              {filteredProducts.length} produto(s) encontrado(s)
            </div>
          )}

          <h1 className="text-2xl font-bold">Catálogo</h1>
          <FiltersCatalog categories={mockedCategories} />
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={String(product.id)}
              name={product.name}
              salePrice={product.salePrice}
              images={product.images[0]}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}

interface ProductProps {
  id: string;
  name: string;
  salePrice: number;
  images: string;
}

function ProductCard({ id, name, salePrice, images }: ProductProps) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div
      id={id}
      className="flex flex-col items-center 
      gap-y-3 pb-5 rounded-lg bg-accent-foreground/5 shadow-md 
      transition-shadow overflow-hidden
      hover:shadow-lg 
      "
    >
      {images && (
        <div className="aspect-square overflow-hidden">
          <img
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-sm"
            src={images}
            alt={name}
          />
        </div>
      )}
      <div className="flex flex-col items-center w-full px-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <h2 className="text-medium font-semibold line-clamp-2 min-h-[50px]">
              {name}
            </h2>
          </TooltipTrigger>
          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>

        <p className="text-2xl font-bold">R$ {salePrice}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center border border-border rounded-lg overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-none"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-4 font-medium min-w-12 text-center">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-none"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="default">
          Adicionar <CirclePlus />
        </Button>
      </div>
    </div>
  );
}
