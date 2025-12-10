"use client";

import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useShoppingCart } from "@/hooks/use-product";

function currencyFormatter(amount: number) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return formatter.replace("R$", "");
}

export function Cart() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart } = useShoppingCart();

  const handleUpdateQuantity = (cartId: string, newQuantity: number) => {
    updateQuantity(cartId, newQuantity);
  };

  const handleRemoveItem = (cartId: string) => {
    removeFromCart(cartId);
  };

  const total = cartItems.reduce(
    (sum: number, item) => sum + item.salePrice * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/Limas-Atacado")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar às compras
        </Button>

        <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

        {cartItems.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground text-lg">
              Seu carrinho está vazio
            </p>
            <Button className="mt-4" onClick={() => router.push("/")}>
              Começar a comprar
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.quantity} Unidades
                        </p>
                      </div>

                      <div className="flex flex-col items-end justify-between gap-y-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="group"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <p className="text-lg font-bold">
                          R${currencyFormatter(item.salePrice * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">Resumo do Pedido</h2>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        R$ {currencyFormatter(total)}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="bg-gradient-primary bg-clip-text text-transparent">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => router.push("checkout")}
                  >
                    Finalizar Pedido
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
