"use client";

import { useEffect, useState } from "react";
import { ProductCatalog } from "../types/product";
import { useShoppingCart } from "../../../hooks/use-product";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { currencyFormatter } from "../../../utils/currencyFormatter";
import { Button } from "@/components/ui/button";
import { Check, CirclePlus, Minus, Plus } from "lucide-react";

export function ProductCard({
  id,
  name,
  salePrice,
  categorySlug,
  thumbnail,
}: ProductCatalog) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useShoppingCart();
  const router = useRouter();
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
      transition-shadow overflow-hidden animate-fade-in
      hover:shadow-lg hover:shadow-elegant"
    >
      {thumbnail && (
        <div className="aspect-square overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform rounded-sm cursor-pointer"
            src={thumbnail}
            alt={name}
            onClick={() => router.push(`/product/${id}`)}
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

        <p className="text-2xl font-bold">R${currencyFormatter(salePrice)}</p>
      </div>
      <div className="flex items-center gap-y-2">
        <div className="hidden items-center border border-border rounded-lg overflow-hidden sm:flex">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-none"
            onClick={() => setQuantity(quantity - 1)}
            disabled={isDisabled || quantity <= 1}
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
