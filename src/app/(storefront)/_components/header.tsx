"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Handbag, HandCoins, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useShoppingCart } from "../hooks/use-product";
import { Item, ItemContent, ItemDescription } from "@/components/ui/item";
import { CartItem } from "../types/product";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Header() {
  const { cartItems, updateQuantity } = useShoppingCart();

  const isEmpty = cartItems.length === 0;

  return (
    <header className="w-full flex items-center justify-center py-5 px-5 bg-accent-foreground/10">
      <div className="max-w-[1280px] flex flex-row w-full justify-between">
        <div className="flex flex-row gap-x-3 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/ElFabrica.png" />
          </Avatar>
          <h1 className="text-xl font-bold">Limas Atacado</h1>
        </div>
        <div className="flex flex-row gap-x-3 items-center">
          <Link className="hidden sm:block" href="/limas-atacado">
            <Button className="rounded-full">Início</Button>
          </Link>
          <Link className="hidden sm:block" href="/about-us">
            <Button className="rounded-full">Sobre Nós</Button>
          </Link>
          <Button variant="outline" className="rounded-full">
            <HandCoins className="size-4" />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="rounded-full">
                <Handbag className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-80 mt-2 mr-2 bg-accent rounded-2xl"
            >
              {isEmpty ? (
                <div
                  className="flex flex-col items-center
               gap-4 bg-accent p-4 rounded-2xl"
                >
                  <h1 className="text-center text-lg font-bold">
                    Seu pedido ainda não possui produtos
                  </h1>
                  <p className="text-center text-sm opacity-80">
                    Navegue para adicionar produtos ao seu pedido
                  </p>
                </div>
              ) : (
                <div className="p-4">
                  <div className="flex items-center gap-x-2">
                    <h1 className="font-bold text-lg">Seu pedido</h1>{" "}
                    <span className="text-sm opacity-80">
                      {cartItems.length} itens
                    </span>
                  </div>
                  {cartItems.map((item) => (
                    <ItemRequested
                      key={item.id}
                      {...item}
                      quantityInit={item.quantity}
                      updateQuantity={updateQuantity}
                    />
                  ))}
                  <Button className="w-full">Finalizar Pedido</Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}

interface ItemRequestedProps extends CartItem {
  quantityInit: number;
  updateQuantity: (id: string, quantity: number) => void;
}

function ItemRequested({
  id,
  name,
  thumbnail,
  quantityInit,
  updateQuantity,
}: ItemRequestedProps) {
  const [quantity, setQuantity] = useState(quantityInit);

  function onSubmit(quantity: number) {
    setQuantity(quantity);
    updateQuantity(id, quantity);
  }

  const isDisabled = quantity <= 1;
  return (
    <Item>
      <ItemContent className="flex flex-row items-center gap-x-2">
        <img
          src={thumbnail}
          alt={name}
          className="w-12 h-12 object-cover rounded-sm"
        />
        <div className="space-y-2">
          <ItemDescription className="">{name}</ItemDescription>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-9 w-9 rounded-none"
              onClick={() => onSubmit(0)}
            >
              <Trash2 className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-9 w-9 rounded-none"
              onClick={() => onSubmit(0)}
              disabled={isDisabled}
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
      </ItemContent>
      <Separator orientation="horizontal" className="w-full" />
    </Item>
  );
}
