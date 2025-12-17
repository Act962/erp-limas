"use client";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { delivery } from "./mock/catalog-moc";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function TabDelivery() {
  const [freeShipping, setFreeShipping] = useState(false);
  const [deliverySelected, setDeliverySelected] = useState<
    (typeof delivery)[0] | null
  >(delivery[3]);
  return (
    <div className="space-y-6 mt-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Entrega</h2>
        <p className="text-sm text-muted-foreground">
          Configure as opções de entrega do seu catálogo
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <Label>Formas de entrega disponíveis</Label>
          <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
            {delivery.map((delivery) => (
              <div
                key={delivery.id}
                className="flex items-center gap-2"
                onClick={() => setDeliverySelected(delivery)}
              >
                <Checkbox
                  checked={deliverySelected?.id == delivery.id}
                  id={delivery.name}
                />
                <Label htmlFor={delivery.name}>{delivery.name}</Label>
              </div>
            ))}
          </div>
          {deliverySelected?.id === "2" && (
            <>
              <div className="space-y-3">
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
