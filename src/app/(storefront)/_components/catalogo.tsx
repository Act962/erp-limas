"use client";

import { Button } from "@/components/ui/button";
import { Check, CirclePlus, IdCard, Minus, Plus } from "lucide-react";
import { FiltersCatalog } from "./filters";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useMemo, useState } from "react";
import { useQueryState } from "nuqs";
import { ProductCatalog } from "../types/product";
import { CategoryCatalog } from "../types/category";
import { useShoppingCart } from "../hooks/use-product";
import { currencyFormatter } from "../utils/currencyFormatter";

export function Catalogo() {
  const [categoryParam] = useQueryState("category");

  const mockedProducts: ProductCatalog[] = [
    {
      id: "1",
      name: "Notebook Gamer RTX 4050",
      salePrice: 5899.9,
      thumbnail: "https://picsum.photos/400/400?random=1",
      images: [
        "https://picsum.photos/800/800?random=1",
        "https://picsum.photos/800/800?random=11",
        "https://picsum.photos/800/800?random=111",
      ],
      categorySlug: "notebooks",
    },
    {
      id: "2",
      name: "Mouse Sem Fio Logitech MX",
      salePrice: 249.9,
      thumbnail: "https://picsum.photos/400/400?random=2",
      images: [
        "https://picsum.photos/800/800?random=2",
        "https://picsum.photos/800/800?random=22",
      ],
      categorySlug: "perifericos",
    },
    {
      id: "3",
      name: "Teclado Mecânico RGB",
      salePrice: 399.99,
      thumbnail: "https://picsum.photos/400/400?random=3",
      images: [
        "https://picsum.photos/800/800?random=3",
        "https://picsum.photos/800/800?random=33",
      ],
      categorySlug: "perifericos",
    },
    {
      id: "4",
      name: 'Monitor 27" Full HD',
      salePrice: 1299.0,
      thumbnail: "https://picsum.photos/400/400?random=4",
      images: [
        "https://picsum.photos/800/800?random=4",
        "https://picsum.photos/800/800?random=44",
      ],
      categorySlug: "monitores",
    },
    {
      id: "5",
      name: "Headset Gamer 7.1",
      salePrice: 799.9,
      thumbnail: "https://picsum.photos/400/400?random=5",
      images: [
        "https://picsum.photos/800/800?random=5",
        "https://picsum.photos/800/800?random=55",
      ],
      categorySlug: "audio",
    },
    {
      id: "6",
      name: "SSD NVMe 1TB",
      salePrice: 699.9,
      thumbnail: "https://picsum.photos/400/400?random=6",
      images: [
        "https://picsum.photos/800/800?random=6",
        "https://picsum.photos/800/800?random=66",
      ],
      categorySlug: "armazenamento",
    },
    {
      id: "7",
      name: "Cadeira Gamer Ergonômica",
      salePrice: 1599.0,
      thumbnail: "https://picsum.photos/400/400?random=7",
      images: [
        "https://picsum.photos/800/800?random=7",
        "https://picsum.photos/800/800?random=77",
        "https://picsum.photos/800/800?random=777",
      ],
      categorySlug: "moveis-gamer",
    },
    {
      id: "8",
      name: "Webcam Full HD",
      salePrice: 299.9,
      thumbnail: "https://picsum.photos/400/400?random=8",
      images: ["https://picsum.photos/800/800?random=8"],
      categorySlug: "acessorios",
    },
    {
      id: "9",
      name: "Caixa de Som Bluetooth",
      salePrice: 349.9,
      thumbnail: "https://picsum.photos/400/400?random=9",
      images: [
        "https://picsum.photos/800/800?random=9",
        "https://picsum.photos/800/800?random=99",
      ],
      categorySlug: "audio",
    },
    {
      id: "10",
      name: "Smartphone Android 128GB",
      salePrice: 2499.0,
      thumbnail: "https://picsum.photos/400/400?random=10",
      images: [
        "https://picsum.photos/800/800?random=10",
        "https://picsum.photos/800/800?random=100",
        "https://picsum.photos/800/800?random=1000",
      ],
      categorySlug: "smartphones",
    },
  ];
  const mockedCategories: CategoryCatalog[] = [
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
          <span className="text-sm text-muted-foreground">
            {filteredProducts.length} produto(s) encontrado(s)
          </span>

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
              thumbnail={product.thumbnail}
              categorySlug={product.categorySlug}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}

function ProductCard({
  id,
  name,
  salePrice,
  categorySlug,
  thumbnail,
}: ProductCatalog) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useShoppingCart();

  const [isMounted, setIsMounted] = useState(false);

  const productInCart = !!cartItems.find((item) => item.id === id);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddToCart = () => {
    addToCart({ id, name, salePrice, categorySlug, thumbnail }, quantity);
  };

  const showAsInCart = isMounted && productInCart;
  const isDisabled = isMounted && productInCart;

  return (
    <div
      id={id}
      className="flex flex-col items-center 
      gap-y-3 pb-5 rounded-lg bg-accent-foreground/5 shadow-md 
      transition-shadow overflow-hidden
      hover:shadow-lg 
      "
    >
      {thumbnail && (
        <div className="aspect-square overflow-hidden">
          <img
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-sm"
            src={thumbnail}
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

        <p className="text-2xl font-bold">{currencyFormatter(salePrice)}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center border border-border rounded-lg overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-none"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={isDisabled}
          >
            <Minus className="size-4" />
          </Button>
          <span className="px-4 font-medium min-w-12 text-center">
            {quantity}
          </span>
          <Button
            disabled={isDisabled}
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-none"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="size-4" />
          </Button>
        </div>
        <Button
          variant="default"
          onClick={handleAddToCart}
          disabled={isDisabled}
        >
          {showAsInCart ? "Adicionado" : "Adicionar"}
          {showAsInCart ? (
            <Check className="size-4" />
          ) : (
            <CirclePlus className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
