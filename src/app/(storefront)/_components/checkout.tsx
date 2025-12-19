"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Store,
  QrCode,
  Banknote,
  ArrowRightLeft,
  CreditCard,
  CreditCard as DebitCard,
  FileText,
  Link as LinkIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeliveryMethod, PaymentMethod } from "../types/product";
import { useShoppingCart } from "@/hooks/use-product";
import { toast } from "sonner";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { useSuspenseQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { payments } from "@/app/(main)/(rest)/catalogo/_components/mock/catalog-moc";

const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || "558688923098";

interface CheckoutProps {
  subdomain: string;
}

export function Checkout({ subdomain }: CheckoutProps) {
  const router = useRouter();
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("delivery");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [address, setAddress] = useState("");
  const [observations, setObservations] = useState("");
  const { cartItems } = useShoppingCart();

  const { data } = useSuspenseQuery(
    orpc.catalogSettings.public.queryOptions({
      input: {
        subdomain: subdomain,
      },
    })
  );

  const { catalogSettings } = data;

  const total = cartItems.reduce(
    (sum: number, item) => sum + item.salePrice * item.quantity,
    0
  );

  const getPaymentMethodLabel = (method: PaymentMethod): string => {
    const labels = {
      pix: "PIX",
      credit: "Cartão de Crédito",
      debit: "Cartão de Débito",
      cash: "Dinheiro",
    };
    return labels[method];
  };

  // Função para formatar o método de entrega
  const getDeliveryMethodLabel = (method: DeliveryMethod): string => {
    const labels = {
      delivery: "Entrega",
      pickup: "Retirada na loja",
    };
    return labels[method];
  };

  const handleConfirmOrder = () => {
    // Validação de endereço
    if (deliveryMethod === "delivery" && !address.trim()) {
      toast.error("Por favor, informe o endereço de entrega");
      return;
    }

    let message = "Olá! Gostaria de fazer um pedido:\n\n";

    message += `*Forma de pagamento:* ${getPaymentMethodLabel(
      paymentMethod
    )}\n`;
    message += `*Método de recebimento:* ${getDeliveryMethodLabel(
      deliveryMethod
    )}\n`;

    if (deliveryMethod === "delivery" && address.trim()) {
      message += `*Endereço:* ${address.trim()}\n`;
    }

    if (observations.trim()) {
      message += `*Observação:* ${observations.trim()}\n`;
    }

    message += "\n*Produtos:*\n";

    cartItems.forEach((item, index) => {
      const itemTotal = (item.salePrice * item.quantity).toFixed(2);
      message += `${index + 1}. ${item.name} ${
        item.quantity
      }x - R$ ${itemTotal}\n`;
    });

    message += `\n*TOTAL: R$ ${total.toFixed(2)}*`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
    toast.success("Redirecionando para o WhatsApp...");
    setTimeout(() => router.push("/"), 2000);
  };

  return (
    <div className="mx-auto w-full px-5 max-w-6xl py-4">
      <Button
        onClick={() => router.push("/Limas-Atacado/cart")}
        variant={"secondary"}
        className="mb-4"
      >
        <ArrowLeft className="size-4" /> Voltar ao carrinho
      </Button>

      <h1 className="text-3xl font-bold mb-8">Finalizar Pedido</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Método de Entrega */}
          <Card>
            <CardHeader>
              <CardTitle>Método de Recebimento</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={deliveryMethod}
                onValueChange={(value) =>
                  setDeliveryMethod(value as DeliveryMethod)
                }
              >
                <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label
                    htmlFor="delivery"
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Entrega</p>
                      <p className="text-sm text-muted-foreground">
                        Receba em casa
                      </p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label
                    htmlFor="pickup"
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <Store className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Retirada</p>
                      <p className="text-sm text-muted-foreground">
                        Retire na loja
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {deliveryMethod === "delivery" && (
                <div className="mt-4 space-y-2">
                  <Label htmlFor="address">Endereço de Entrega</Label>
                  <Textarea
                    id="address"
                    placeholder="Rua, número, bairro, complemento..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Método de Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle>Forma de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) =>
                  setPaymentMethod(value as PaymentMethod)
                }
              >
                {catalogSettings.paymentMethodSettings.map((method) => (
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={method} id={method} />
                    <Label
                      htmlFor={method}
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <span className="font-medium">
                        {payments.find((p) => p.method === method)?.name}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Alguma observação sobre o pedido?"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Resumo */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">
                      R$ {currencyFormatter(item.salePrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    R$ {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handleConfirmOrder}>
                Confirmar Pedido
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
