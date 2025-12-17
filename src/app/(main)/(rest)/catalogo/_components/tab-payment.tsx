import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { payments } from "./mock/catalog-moc";
import { Input } from "@/components/ui/input";

export function TabPayment() {
  return (
    <div className="space-y-6 mt-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Pagamento</h2>
        <p className="text-sm text-muted-foreground">
          Configure as opções de pagamento do seu catálogo
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">
            Formas de pagamento disponíveis
          </h2>

          <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center gap-2">
                <Checkbox id={payment.name} />
                <Label
                  className="text-sm text-muted-foreground"
                  htmlFor={payment.name}
                >
                  {payment.name}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
