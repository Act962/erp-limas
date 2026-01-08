import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CatalogSettingsProps } from "./catalog";
import { colors } from "./mock/catalog-moc";
import { Field, FieldDescription } from "@/components/ui/field";
import { Uploader } from "@/components/file-uploader/uploader";

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
            <Label htmlFor="carouselImage">Carrossel inicial</Label>

            <Field className="text-center">
              <Uploader />
              <FieldDescription>
                Formatos aceitos: JPG, PNG, GIF
                <br />
                Tamanho máximo: 5MB
              </FieldDescription>
            </Field>
            <p className="text-xs text-muted-foreground">
              Aparecerá no topo do catálogo
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ColorPicker">Cor do tema do catálogo</Label>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <div
                  className={`p-0.5 rounded-full items-center justify-center ${
                    settings.theme === color &&
                    "border-2 border-accent-foreground/70 shadow-lg"
                  }`}
                  key={`id-${color}`}
                >
                  <div
                    style={{ backgroundColor: color }}
                    className={`w-5 h-5 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200 `}
                    onClick={() => setSettings({ ...settings, theme: color })}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
