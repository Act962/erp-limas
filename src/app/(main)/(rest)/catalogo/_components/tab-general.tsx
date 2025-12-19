import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CatalogSettingsProps } from "./catalog";

interface GeneralTabProps {
  settings: CatalogSettingsProps;
  setSettings: (settings: CatalogSettingsProps) => void;
}

export function GeneralTab({ settings, setSettings }: GeneralTabProps) {
  return (
    <div className="space-y-6 mt-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Geral</h2>
        <p className="text-sm text-muted-foreground">Configurações gerais</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Título da Página</Label>
            <Input
              id="metaTitle"
              placeholder="Ex: Minha Loja - Produtos de Qualidade"
              value={settings.metaTitle}
              onChange={(e) =>
                setSettings({ ...settings, metaTitle: e.target.value })
              }
            />
            <p className="text-xs text-muted-foreground">
              Recomendado: 50-60 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">Descrição da Página</Label>
            <Textarea
              id="metaDescription"
              placeholder="Descrição que aparecerá nos resultados de busca"
              value={settings.metaDescription}
              onChange={(e) =>
                setSettings({ ...settings, metaDescription: e.target.value })
              }
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Recomendado: 150-160 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              value={settings.cnpj}
              onChange={(e) =>
                setSettings({ ...settings, cnpj: e.target.value })
              }
              id="cnpj"
              placeholder="Ex: 12.345.678/0001-99"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aboutText">Sobre nós</Label>
            <Textarea
              id="aboutText"
              placeholder="Ex: Digite uma breve descrição sobre a sua loja para que seus clientes possam conhecer um pouco mais sobre ela"
              value={settings.aboutText}
              onChange={(e) =>
                setSettings({ ...settings, aboutText: e.target.value })
              }
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
