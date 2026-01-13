"use client";

import { useEffect, useState } from "react";
import type { ProductCatalog } from "../../types/product";
import { useShoppingCart } from "@/hooks/use-product";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { currencyFormatter } from "@/utils/currency-formatter";
import { Button } from "@/components/ui/button";
import { Check, CirclePlus, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useConstructUrl } from "@/hooks/use-construct-url";
import placeholder from "@/assets/background-default-image.svg";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps extends ProductCatalog {
  allowsOrders?: boolean;
  subdomain: string;
}

export function ProductCard({
  id,
  name,
  description,
  salePrice,
  thumbnail,
  allowsOrders,
  slug,
  subdomain,
}: ProductCardProps) {
  const { addToCart, cartItems } = useShoppingCart();
  const { toggleProduct, isProductInCart } = useCart(subdomain);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const showAsInCart = isMounted && isProductInCart(id);
  const isDisabled = isMounted && isProductInCart(id);

  const imageSrc =
    thumbnail && thumbnail.trim() !== ""
      ? useConstructUrl(thumbnail)
      : placeholder;

  return (
    <div
      id={id}
      className="flex flex-col items-center 
      gap-y-3 pb-5 rounded-lg bg-accent-foreground/5 shadow-md 
      transition-shadow overflow-hidden animate-fade-in
      hover:shadow-lg hover:shadow-elegant"
    >
      <div className="aspect-square overflow-hidden w-full relative h-45">
        <Link href={`/${slug}`}>
          <Image
            className="object-cover transition-transform rounded-sm cursor-pointer"
            src={imageSrc}
            alt={name}
            fill
          />
        </Link>
      </div>
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
        <Tooltip>
          <TooltipTrigger asChild>
            <h2 className="text-xs line-clamp-2 min-h-[35px]">{description}</h2>
          </TooltipTrigger>
          <TooltipContent>
            <p>{description}</p>
          </TooltipContent>
        </Tooltip>

        <p className="text-2xl font-bold">R${currencyFormatter(salePrice)}</p>
      </div>
      {allowsOrders && (
        <div className="flex items-center gap-x-2">
          <Button
            variant="default"
            onClick={() => toggleProduct(id, "1")}
            disabled={isDisabled}
          >
            {showAsInCart ? "No carrinho" : "Adicionar"}
            {showAsInCart ? (
              <Check className="size-4" />
            ) : (
              <CirclePlus className="size-4" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
