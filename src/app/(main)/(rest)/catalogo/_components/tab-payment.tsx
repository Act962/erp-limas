import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { payments } from "./mock/catalog-moc";

export function TabPayment() {
  return (
    <div className="space-y-6 mt-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Pagamento</h2>
        <p className="text-sm text-muted-foreground">
          Configure as opções de pagamento do seu catálogo
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <Label>Formas de pagamento disponíveis</Label>
          <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center gap-2">
                <Checkbox id={payment.name} />
                <Label htmlFor={payment.name}>{payment.name}</Label>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
