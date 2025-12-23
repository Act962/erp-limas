"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Handbag, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useShoppingCart } from "../../../hooks/use-product";
import { Item, ItemContent, ItemDescription } from "@/components/ui/item";
import { CartItem } from "../types/product";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { getContrastColor } from "@/utils/get-contrast-color";

interface Settings {
  metaTitle: string | null;
  theme: string | null;
}

interface HeaderProps {
  settings: Settings;
}

export function Header({ settings }: HeaderProps) {
  const router = useRouter();
  const { cartItems, updateQuantity } = useShoppingCart();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const isEmpty = cartItems.length === 0;

  const backgroundColor = settings.theme ?? "var(--accent-foreground)";
  const contrastColor = getContrastColor(backgroundColor);

  function handleGoToCart() {
    setModalIsOpen(false);
    router.push("/cart");
  }

  return (
    <header
      className="w-full flex fixed top-0 z-50 items-center justify-center py-3 px-5 transition-colors duration-300 sm:py-5"
      style={{
        backgroundColor,
        color: contrastColor,
        borderBottom: `1px solid ${contrastColor}33`,
      }}
    >
      <div className="max-w-6xl flex flex-row w-full justify-between">
        {/* Logo + Título */}
        <div
          onClick={() => router.push("/")}
          className="flex flex-row gap-x-3 items-center cursor-pointer"
        >
          <Avatar>
            <AvatarImage src="https://github.com/ElFabrica.png" />
          </Avatar>

          <h1 className="text-xl font-bold" style={{ color: contrastColor }}>
            {settings.metaTitle ?? "Minha loja"}
          </h1>
        </div>

        <div className="flex flex-row gap-x-3 items-center">
          {/* Botão Início */}
          <Link className="hidden sm:block" href="/">
            <Button variant="secondary" className="rounded-full">
              Início
            </Button>
          </Link>

          {/* Botão Sobre Nós */}
          <Link className="hidden sm:block" href="/sobre-nos">
            <Button variant="secondary" className="rounded-full">
              Sobre Nós
            </Button>
          </Link>

          {/* Carrinho */}
          <Popover open={modalIsOpen} onOpenChange={setModalIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="secondary" className="rounded-full">
                <Handbag className="size-4" />
              </Button>
            </PopoverTrigger>

            <PopoverContent align="end" className="w-80 mt-2 mr-2 rounded-2xl">
              {isEmpty ? (
                <div className="flex flex-col items-center gap-4 p-4 rounded-2xl">
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
                    <h1 className="font-bold text-lg">Seu pedido</h1>

                    <span className="text-sm opacity-80">
                      {cartItems.length} itens
                    </span>
                  </div>

                  <div className="flex flex-1 max-h-72">
                    <ScrollArea className="w-full rounded-md">
                      {cartItems.map((item) => (
                        <ItemRequested
                          slug={item.slug}
                          key={item.id}
                          id={item.id}
                          thumbnail={item.thumbnail ?? ""}
                          name={item.name}
                          quantityInit={item.quantity}
                          updateQuantity={updateQuantity}
                          contrastColor={contrastColor}
                          salePrice={item.salePrice}
                          quantity={item.quantity}
                        />
                      ))}
                    </ScrollArea>
                  </div>

                  <Button
                    className="w-full mt-3"
                    variant={"secondary"}
                    onClick={handleGoToCart}
                  >
                    Finalizar Pedido
                  </Button>
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
  contrastColor: string;
}

function ItemRequested({
  id,
  name,
  thumbnail,
  quantityInit,
  updateQuantity,
}: ItemRequestedProps) {
  const [quantity, setQuantity] = useState(quantityInit);

  const isDisabled = quantity <= 1;

  function onSubmit(qtd: number) {
    setQuantity(qtd);
    updateQuantity(id, qtd);
  }

  return (
    <Item>
      <ItemContent className="flex flex-row items-center gap-x-2">
        <img
          src={thumbnail}
          alt={name}
          className="w-12 h-12 object-cover rounded-sm"
        />

        <div className="space-y-2">
          <ItemDescription>{name}</ItemDescription>

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
              variant="secondary"
              size="icon-sm"
              className="h-9 w-9 rounded-none"
              onClick={() => onSubmit(quantity - 1)}
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
