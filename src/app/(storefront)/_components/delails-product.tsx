"use client";

import { useState } from "react";
import { ProductCatalog } from "../types/product";
import { currencyFormatter } from "../utils/currencyFormatter";
import { Header } from "./header-catalog";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
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
    <div>
      <Header />
      <div className="mx-auto items-center w-full max-w-6xl py-5 px-3">
        <div className="flex flex-row justify-between gap-5 ">
          <div className="flex flex-row justify-evenly gap-x-4">
            <div className="flex flex-col justify-between gap-2">
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
            <img src={imageSelected} alt={name} className="w-1/2 rounded-2xl" />
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
            <div>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-9 w-9 rounded-none"
                ></Button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
