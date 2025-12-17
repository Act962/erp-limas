"use client";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { deliveryMethods, freightOptions } from "./mock/catalog-moc";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export function TabDelivery() {
  const [freeShipping, setFreeShipping] = useState(false);
  const [deliverySelected, setDeliverySelected] = useState<
    (typeof deliveryMethods)[0] | null
  >(deliveryMethods[3]);
  return (
    <div className="space-y-6 mt-4">
      <div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-foreground">Entrega</h2>
          <p className="text-sm text-muted-foreground">
            Configure as opções de entrega do seu catálogo
          </p>
        </div>
      </div>

      <Card className="p-6 space-y-2">
        <div className="space-y-3">
          <Label>Formas de entrega disponíveis</Label>
          <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
            {deliveryMethods.map((deliveryMethod) => (
              <div key={deliveryMethod.id} className="flex items-center gap-2">
                <Checkbox id={deliveryMethod.name} />
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor={deliveryMethod.name}
                >
                  {deliveryMethod.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <Label htmlFor="info-delivery">
            Informações especiais sobre entrega e envio
          </Label>
          <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
            <Textarea
              id="info-delivery"
              className="text-sm"
              placeholder="Insira aqui informações importantes sobre a entrega que você gostaria que seus clientes soubessem. Ex: Frete grátis a partir de R$200,00"
            />
          </div>
        </div>
        <div className="space-y-3">
          <Label>Configuração de Precificação do Frete</Label>
          <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
            {freightOptions.map((freightOption) => (
              <div
                key={freightOption.id}
                className="flex items-center gap-2"
                onClick={() => setDeliverySelected(freightOption)}
              >
                <Checkbox
                  checked={deliverySelected?.id == freightOption.id}
                  id={freightOption.name}
                />
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor={freightOption.name}
                >
                  {freightOption.name}
                </Label>
              </div>
            ))}
          </div>
          {deliverySelected?.id === "2" && (
            <>
              <div className="space-y-3 mt-2">
                <Label>Como deve ser cobrado o valor do frete:</Label>

                <RadioGroup defaultValue="kg" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixo" id="fixo" />
                    <Label htmlFor="fixo">Fixo por pedido</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kg" id="kg" />
                    <Label htmlFor="kg">Valor por Kg</Label>
                  </div>
                </RadioGroup>

                <div className="flex items-center gap-2">
                  <Input placeholder="R$ 0,00" className="w-32" />
                  <span className="text-sm text-muted-foreground">
                    Por quilo
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <Label className="font-medium">Mais opções:</Label>

                <div className="flex items-center justify-between">
                  <Label>Frete grátis a partir de um valor</Label>
                  <Switch
                    checked={freeShipping}
                    onCheckedChange={setFreeShipping}
                  />
                </div>

                {freeShipping && (
                  <Input placeholder="R$ 0,00" className="w-40" />
                )}
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
