import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

export function TabIntegration() {
  return (
    <div className="space-y-6 mt-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Integrações</h2>
        <p className="text-sm text-muted-foreground">
          Conecte seu catálogo a meta
        </p>
      </div>
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="googleAnalytics">ID do Google Analytics</Label>
            <Input id="googleAnalytics" placeholder="000000000000000" />
            <p className="text-sm text-muted-foreground">
              Receba os principais eventos do seu eventos do seu catálogo
              diretamente no Google Analytics. Faça análises de tráfego e
              vendas.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="metaPixel">
              Seu ID do Pixel da Meta (Facebook)
            </Label>
            <InputGroup>
              <InputGroupAddon>G- </InputGroupAddon>
              <InputGroupInput id="metaPixel" />
            </InputGroup>
            <p className="text-sm text-muted-foreground">
              Integre seu catálogo ao seu Meta Pixel (Facebook) e tenha
              relatórios avançados sobre tráfego, campanhas e conversões.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
