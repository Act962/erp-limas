import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { phoneMask } from "@/utils/format-phone";
import { CatalogSettingsProps } from "./catalog";

interface ContactTabProps {
  settings: CatalogSettingsProps;
  setSettings: (settings: CatalogSettingsProps) => void;
}

export function TabContact({ settings, setSettings }: ContactTabProps) {
  return (
    <div className="space-y-6 mt-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Contato</h2>
        <p className="text-sm text-muted-foreground">
          Configure os canais de comunicação
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">Número do WhatsApp</Label>
            <Input
              id="whatsappNumber"
              placeholder="Ex: +55 11 98765-4321"
              value={settings.whatsappNumber}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  whatsappNumber: phoneMask(e.target.value),
                })
              }
            />
            <p className="text-xs text-muted-foreground">
              Formato: DDD + número
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-6">
            <div className="space-y-0.5">
              <Label htmlFor="showWhatsapp" className="text-base font-medium">
                Exibir WhatsApp
              </Label>
              <p className="text-sm text-muted-foreground">
                Mostra o botão do WhatsApp no catálogo
              </p>
            </div>
            <Switch
              id="showWhatsapp"
              checked={settings.showWhatsapp}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  showWhatsapp: checked,
                })
              }
            />
          </div>

          <div className="space-y-2 border-t border-border pt-6">
            <Label htmlFor="contactEmail">Email de Contato</Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="contato@exemplo.com.br"
              value={settings.contactEmail}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contactEmail: e.target.value,
                })
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
