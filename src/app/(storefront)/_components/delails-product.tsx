"use client";

import { useState } from "react";
import { ProductCatalog } from "../types/product";
import { currencyFormatter } from "../utils/currencyFormatter";
import { Header } from "./header-catalog";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useShoppingCart } from "../hooks/use-product";

interface DetailsPoductProps extends ProductCatalog {
  quantityInit: number;
}

export function DetailsPoduct({
  id,
  name,
  salePrice,
  categorySlug,
  images,
  thumbnail,
  quantityInit,
}: DetailsPoductProps) {
  const [imageSelected, setImageSelected] = useState(thumbnail);
  const [quantity, setQuantity] = useState(quantityInit || 0);
  const { cartItems, updateQuantity } = useShoppingCart();

  function onSubmit(quantity: number) {
    setQuantity(quantity);
    updateQuantity(id, quantity);
  }

  return (
    <div className="h-screen space-y-5">
      <Header />
      <div className="mx-auto items-center flex-1 w-full max-w-5xl py-5 px-10 bg-accent-foreground/10 rounded-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 flex-1 w-full gap-5">
          <div className="flex justify-center flex-1 flex-row gap-x-5 sm:justify-start sm:col-span-2">
            <div className="hidden sm:flex flex-col gap-4 min-w-13">
              {images &&
                images.map((image) => (
                  <img
                    data-selected={imageSelected === image}
                    key={image}
                    src={image}
                    alt={name}
                    className="w-15 h-15 rounded-sm cursor-pointer
                  data-[selected=true]:ring-2 data-[selected=true]:ring-primary/40"
                    onClick={() => setImageSelected(image)}
                  />
                ))}
            </div>
            <div className="items-center sm:block">
              <img
                src={imageSelected}
                alt={name}
                className="w-full rounded-2xl
               object-cover"
              />
            </div>
          </div>
          <div className="h-full">
            <h1 className="font-bold text-3xl">{name}</h1>
            <h3 className="text-2xl font-semibold opacity-80 mt-2">
              R${currencyFormatter(salePrice)}
            </h3>
            <div className="flex flex-col mt-2">
              <span className="text-md font-medium">Categoria</span>
              <span className="text-md font-medium text-muted-foreground">
                {categorySlug}
              </span>
            </div>
            <div className="flex flex-wrap items-center mt-4 gap-4">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-9 w-9 rounded-none"
                >
                  <Minus className="size-4" />
                </Button>
                <span className="px-4 font-medium min-w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-9 w-9 rounded-none"
                  onClick={() => onSubmit(quantity + 1)}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              <Button>
                <ShoppingBag /> Adicionar ao Carrinho
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
