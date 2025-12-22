"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Smartphone,
  FileText,
  ArrowLeftRight,
  Wallet,
  Truck,
  MessageCircle,
  Gift,
  XCircle,
  MapPin,
  Store,
  Home,
  BedDouble,
  Download,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { useShoppingCart } from "@/hooks/use-product";
import { toast } from "sonner";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { useSuspenseQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";

const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || "558688923098";

interface CheckoutProps {
  subdomain: string;
}

// Mapeamento de métodos de pagamento com ícones e labels
const paymentMethodsConfig = {
  DINHEIRO: {
    label: "Dinheiro",
    icon: Banknote,
  },
  PIX: {
    label: "PIX",
    icon: Smartphone,
  },
  DEBITO: {
    label: "Cartão de Débito",
    icon: CreditCard,
  },
  CREDITO: {
    label: "Cartão de Crédito",
    icon: CreditCard,
  },
  BOLETO: {
    label: "Boleto",
    icon: FileText,
  },
  TRANSFERENCIA: {
    label: "Transferência Bancária",
    icon: ArrowLeftRight,
  },
  OUTROS: {
    label: "Outros",
    icon: Wallet,
  },
};

// Mapeamento de métodos de entrega com ícones e labels
const deliveryMethodsConfig = {
  DELIVERY_HOME: {
    label: "Entrega em Casa",
    description: "Receba no conforto da sua casa",
    icon: Home,
  },
  PICKUP_STORE: {
    label: "Retirada na Loja",
    description: "Retire pessoalmente na loja",
    icon: Store,
  },
  ROOM_SERVICE: {
    label: "Room Service",
    description: "Entrega no quarto",
    icon: BedDouble,
  },
  DIGITAL_DELIVERY: {
    label: "Entrega Digital",
    description: "Receba por e-mail ou download",
    icon: Download,
  },
};

// Mapeamento de opções de frete
const freightOptionsConfig = {
  NEGOTIATE_WHATSAPP: {
    label: "Combinar via WhatsApp",
    icon: MessageCircle,
    description: "Valor será combinado no WhatsApp",
  },
  NEGOTIATE_FREIGHT: {
    label: "Combinar Frete",
    icon: Truck,
    description: "Valor do frete a combinar",
  },
  FREE_SHIPPING: {
    label: "Frete Grátis",
    icon: Gift,
    description: "Entrega sem custo adicional",
  },
  NO_SHIPPING: {
    label: "Sem Entrega",
    icon: XCircle,
    description: "Apenas retirada",
  },
};

export function Checkout({ subdomain }: CheckoutProps) {
  const router = useRouter();
  const [deliveryMethod, setDeliveryMethod] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
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

  // Filtrar apenas os métodos de pagamento disponíveis
  const availablePaymentMethods = useMemo(() => {
    return catalogSettings.paymentMethodSettings.filter(
      (method) => method in paymentMethodsConfig
    );
  }, [catalogSettings.paymentMethodSettings]);

  // Filtrar apenas os métodos de entrega disponíveis
  const availableDeliveryMethods = useMemo(() => {
    return catalogSettings.deliveryMethods.filter(
      (method) => method in deliveryMethodsConfig
    );
  }, [catalogSettings.deliveryMethods]);

  // Calcular total do carrinho
  const subtotal = cartItems.reduce(
    (sum: number, item) => sum + item.salePrice * item.quantity,
    0
  );

  // Calcular peso total (se os produtos tiverem peso)
  const totalWeight = cartItems.reduce(
    (sum: number, item) => sum + 2 * item.quantity,
    0
  );

  // Calcular valor do frete
  const calculateFreight = () => {
    console.log(catalogSettings);
    const {
      freightOptions,
      freightChargeType,
      freightFixedValue,
      freightValuePerKg,
      freeShippingEnabled,
      freeShippingMinValue,
    } = catalogSettings;

    // Se frete grátis estiver habilitado e o valor mínimo for atingido
    if (freeShippingEnabled && subtotal >= Number(freeShippingMinValue)) {
      return 0;
    }

    // Se a opção de frete for grátis
    if (freightOptions === "FREE_SHIPPING") {
      return 0;
    }

    // Se não houver entrega ou for negociar, retorna 0 (será combinado depois)
    if (
      freightOptions === "NO_SHIPPING" ||
      freightOptions === "NEGOTIATE_WHATSAPP"
    ) {
      return 0;
    }

    // Calcular baseado no tipo de cobrança
    if (freightChargeType === "FIXED") {
      return Number(freightFixedValue);
    } else if (freightChargeType === "PER_KG") {
      return Number(freightValuePerKg) * totalWeight;
    }

    return 0;
  };

  const freightValue = calculateFreight();
  const total = subtotal + freightValue;

  // Verificar se frete grátis foi aplicado
  const isFreeShippingApplied =
    catalogSettings.freeShippingEnabled &&
    subtotal >= Number(catalogSettings.freeShippingMinValue) &&
    freightValue === 0;

  // Definir o primeiro método disponível como padrão
  useEffect(() => {
    if (availablePaymentMethods.length > 0 && !paymentMethod) {
      setPaymentMethod(availablePaymentMethods[0]);
    }
  }, [availablePaymentMethods, paymentMethod]);

  useEffect(() => {
    if (availableDeliveryMethods.length > 0 && !deliveryMethod) {
      setDeliveryMethod(availableDeliveryMethods[0]);
    }
  }, [availableDeliveryMethods, deliveryMethod]);

  const getPaymentMethodLabel = (method: string): string => {
    return (
      paymentMethodsConfig[method as keyof typeof paymentMethodsConfig]
        ?.label || method
    );
  };

  const getDeliveryMethodLabel = (method: string): string => {
    return (
      deliveryMethodsConfig[method as keyof typeof deliveryMethodsConfig]
        ?.label || method
    );
  };

  const getFreightOptionLabel = (): string => {
    const option = catalogSettings.freightOptions;
    return (
      freightOptionsConfig[option as keyof typeof freightOptionsConfig]
        ?.label || "Entrega"
    );
  };

  const handleConfirmOrder = () => {
    // Validação de método de pagamento
    if (!paymentMethod) {
      toast.error("Por favor, selecione um método de pagamento");
      return;
    }

    // Validação de método de entrega
    if (!deliveryMethod) {
      toast.error("Por favor, selecione um método de entrega");
      return;
    }

    // Validação de endereço para entrega em casa
    if (deliveryMethod === "DELIVERY_HOME" && !address.trim()) {
      toast.error("Por favor, informe o endereço de entrega");
      return;
    }

    let message = "Olá! Gostaria de fazer um pedido:\n\n";

    message += `*Forma de pagamento:* ${getPaymentMethodLabel(
      paymentMethod
    )}\n`;
    message += `*Método de entrega:* ${getDeliveryMethodLabel(
      deliveryMethod
    )}\n`;

    if (deliveryMethod === "DELIVERY_HOME" && address.trim()) {
      message += `*Endereço:* ${address.trim()}\n`;
    }

    // Informações de frete
    if (freightValue > 0) {
      message += `*Valor do frete:* R$ ${freightValue.toFixed(2)}\n`;
    } else if (isFreeShippingApplied) {
      message += `*Frete:* Grátis (pedido acima de R$ ${catalogSettings.freeShippingMinValue})\n`;
    } else if (
      catalogSettings.freightOptions === "NEGOTIATE_WHATSAPP" ||
      catalogSettings.freightOptions === "NEGOTIATE_FREIGHT"
    ) {
      message += `*Frete:* A combinar\n`;
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

    message += `\n*Subtotal:* R$ ${subtotal.toFixed(2)}`;
    if (freightValue > 0) {
      message += `\n*Frete:* R$ ${freightValue.toFixed(2)}`;
    }
    message += `\n*TOTAL: R$ ${total.toFixed(2)}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
    toast.success("Redirecionando para o WhatsApp...");
    setTimeout(() => router.push("/"), 2000);
  };

  const needsAddress = deliveryMethod === "DELIVERY_HOME";

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
              <CardTitle>Método de Entrega</CardTitle>
            </CardHeader>
            <CardContent>
              {availableDeliveryMethods.length > 0 ? (
                <RadioGroup
                  value={deliveryMethod}
                  onValueChange={(value) => setDeliveryMethod(value)}
                >
                  {availableDeliveryMethods.map((method) => {
                    const config =
                      deliveryMethodsConfig[
                        method as keyof typeof deliveryMethodsConfig
                      ];
                    const IconComponent = config?.icon;

                    return (
                      <div
                        key={method}
                        className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <RadioGroupItem value={method} id={method} />
                        <Label
                          htmlFor={method}
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          {IconComponent && (
                            <IconComponent className="h-5 w-5 opacity-60" />
                          )}
                          <div>
                            <p className="font-medium">{config?.label}</p>
                            <p className="text-sm text-muted-foreground">
                              {config?.description}
                            </p>
                          </div>
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhum método de entrega disponível no momento.
                </p>
              )}

              {needsAddress && (
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

              {/* Informações sobre o frete */}
              {catalogSettings.deliverySpecialInfo && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    {catalogSettings.deliverySpecialInfo}
                  </p>
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
              {availablePaymentMethods.length > 0 ? (
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value)}
                >
                  {availablePaymentMethods.map((method) => {
                    const config =
                      paymentMethodsConfig[
                        method as keyof typeof paymentMethodsConfig
                      ];
                    const IconComponent = config?.icon;

                    return (
                      <div
                        key={method}
                        className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <RadioGroupItem value={method} id={method} />
                        <Label
                          htmlFor={method}
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          {IconComponent && (
                            <IconComponent className="h-5 w-5 opacity-60" />
                          )}
                          <span className="font-medium">
                            {config?.label || method}
                          </span>
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhum método de pagamento disponível no momento.
                </p>
              )}
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

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">
                    R$ {currencyFormatter(subtotal)}
                  </span>
                </div>

                {/* Exibir informação do frete */}
                {freightValue > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="font-medium">
                      R$ {currencyFormatter(freightValue)}
                    </span>
                  </div>
                )}

                {isFreeShippingApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="font-medium text-green-600">Grátis</span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="bg-gradient-primary bg-clip-text">
                    R$ {currencyFormatter(total)}
                  </span>
                </div>

                {/* Mensagem de frete grátis próximo */}
                {catalogSettings.freeShippingEnabled &&
                  !isFreeShippingApplied &&
                  subtotal < Number(catalogSettings.freeShippingMinValue) && (
                    <p className="text-xs text-muted-foreground text-center pt-2">
                      Faltam R${" "}
                      {currencyFormatter(
                        Number(catalogSettings.freeShippingMinValue) - subtotal
                      )}{" "}
                      para frete grátis
                    </p>
                  )}
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleConfirmOrder}
                disabled={
                  availablePaymentMethods.length === 0 ||
                  availableDeliveryMethods.length === 0
                }
              >
                Confirmar Pedido
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
