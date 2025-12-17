import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CirclePicker } from "react-color";
import { CatalogSettingsProps } from "./catalog";

interface CustomizationTabProps {
  settings: CatalogSettingsProps;
  setSettings: (settings: CatalogSettingsProps) => void;
}

export function TabCustomization({
  settings,
  setSettings,
}: CustomizationTabProps) {
  return (
    <div className="space-y-6 mt-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Personalização
        </h2>
        <p className="text-sm text-muted-foreground">
          Customize a aparência do seu catálogo
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bannerImage">URL da Imagem do Banner</Label>
            <Input
              id="bannerImage"
              placeholder="https://exemplo.com/banner.jpg"
              value={settings.bannerImage}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  bannerImage: e.target.value,
                })
              }
            />
            <p className="text-xs text-muted-foreground">
              Aparecerá no topo do catálogo
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="aboutText">Texto Sobre a Loja</Label>
            <Textarea
              id="aboutText"
              placeholder="Conte sobre sua loja, produtos e diferenciais..."
              value={settings.aboutText}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  aboutText: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ColorPicker">Cor do tema do catálogo</Label>
            <CirclePicker
              width="100%"
              colors={[
                "#f44336",
                "#e91e63",
                "#9c27b0",
                "#673ab7",
                "#3f51b5",
                "#2196f3",
                "#03a9f4",
                "#00bcd4",
                "#009688",
                "#4caf50",
                "#8bc34a",
                "#cddc39",
                "#ffeb3b",
                "#ffc107",
                "#ff9800",
                "#ff5722",
                "#795548",
                "#607d8b",
              ]}
              onChange={(e) => setSettings({ ...settings, theme: e.hex })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
