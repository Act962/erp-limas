"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Settings,
  Eye,
  MessageCircle,
  Search,
  Palette,
  Share2,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TabId = "visibility" | "contact" | "seo" | "customization" | "social";

export function CatalogSettings() {
  const [settings, setSettings] = useState({
    isActive: true,
    showPrices: true,
    showStock: false,
    allowOrders: false,
    whatsappNumber: "",
    showWhatsapp: true,
    contactEmail: "",
    metaTitle: "",
    metaDescription: "",
    bannerImage: "",
    aboutText: "",
    instagram: "",
    facebook: "",
  });

  const tabs = [
    {
      id: "visibility" as const,
      label: "Visibilidade",
      icon: Eye,
      description: "Controle o que é exibido",
    },
    {
      id: "contact" as const,
      label: "Contato",
      icon: MessageCircle,
      description: "Canais de comunicação",
    },
    {
      id: "seo" as const,
      label: "SEO",
      icon: Search,
      description: "Otimização de buscas",
    },
    {
      id: "customization" as const,
      label: "Personalização",
      icon: Palette,
      description: "Aparência do catálogo",
    },
    {
      id: "social" as const,
      label: "Redes Sociais",
      icon: Share2,
      description: "Conecte suas redes",
    },
  ];

  return (
    <div className="bg-background">
      <main className="mx-auto max-w-7xl">
        <div className="flex flex-col">
          {/* Sidebar de navegação */}
          <Tabs defaultValue="visibility">
            <TabsList>
              <div className="overflow-x-auto">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
            <TabsContent value="visibility">
              <div className="space-y-6 mt-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Visibilidade
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Controle o que é exibido no seu catálogo
                  </p>
                </div>

                <Card className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label
                          htmlFor="isActive"
                          className="text-base font-medium"
                        >
                          Catálogo Ativo
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Permite que visitantes acessem o catálogo
                        </p>
                      </div>
                      <Switch
                        id="isActive"
                        checked={settings.isActive}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, isActive: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-6">
                      <div className="space-y-0.5">
                        <Label
                          htmlFor="showPrices"
                          className="text-base font-medium"
                        >
                          Mostrar Preços
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Exibe os preços dos produtos
                        </p>
                      </div>
                      <Switch
                        id="showPrices"
                        checked={settings.showPrices}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, showPrices: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-6">
                      <div className="space-y-0.5">
                        <Label
                          htmlFor="showStock"
                          className="text-base font-medium"
                        >
                          Mostrar Estoque
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Exibe a quantidade disponível em estoque
                        </p>
                      </div>
                      <Switch
                        id="showStock"
                        checked={settings.showStock}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, showStock: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-6">
                      <div className="space-y-0.5">
                        <Label
                          htmlFor="allowOrders"
                          className="text-base font-medium"
                        >
                          Permitir Pedidos
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Habilita o botão de fazer pedido
                        </p>
                      </div>
                      <Switch
                        id="allowOrders"
                        checked={settings.allowOrders}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, allowOrders: checked })
                        }
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="contact">
              <div className="space-y-6 mt-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Contato
                  </h2>
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
                            whatsappNumber: e.target.value,
                          })
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Formato: código do país + DDD + número
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-6">
                      <div className="space-y-0.5">
                        <Label
                          htmlFor="showWhatsapp"
                          className="text-base font-medium"
                        >
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
                          setSettings({ ...settings, showWhatsapp: checked })
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
            </TabsContent>
            <TabsContent value="seo">
              <div className="space-y-6 mt-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Otimização para Buscadores
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Melhore a visibilidade do seu catálogo no Google
                  </p>
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
                          setSettings({
                            ...settings,
                            metaTitle: e.target.value,
                          })
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Recomendado: 50-60 caracteres
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">
                        Descrição da Página
                      </Label>
                      <Textarea
                        id="metaDescription"
                        placeholder="Descrição que aparecerá nos resultados de busca"
                        value={settings.metaDescription}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            metaDescription: e.target.value,
                          })
                        }
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground">
                        Recomendado: 150-160 caracteres
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="customization">
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
                      <Label htmlFor="bannerImage">
                        URL da Imagem do Banner
                      </Label>
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
                  </div>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="social">
              <div className="space-y-6 mt-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Redes Sociais
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Conecte suas redes sociais ao catálogo
                  </p>
                </div>

                <Card className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        placeholder="@minhaloja ou https://instagram.com/minhaloja"
                        value={settings.instagram}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            instagram: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        placeholder="https://facebook.com/minhaloja"
                        value={settings.facebook}
                        onChange={(e) =>
                          setSettings({ ...settings, facebook: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
