"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { useDebouncedValue } from "@/utils/use-debouced";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CirclePicker } from "react-color";
import { phoneMask } from "@/utils/format-phone";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { payments, SORT_ORDER, tabs } from "./mock/catalog-moc";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export function CatalogSettings() {
  const { data } = useSuspenseQuery(orpc.catalogSettings.list.queryOptions());
  const { catalogSettings } = data;

  const [settings, setSettings] = useState({
    isActive: catalogSettings.isActive,
    showPrices: catalogSettings.showPrices,
    showStock: catalogSettings.showStock,
    allowOrders: catalogSettings.allowOrders,
    whatsappNumber: phoneMask(String(catalogSettings.whatsappNumber)) || "",
    showWhatsapp: catalogSettings.showWhatsapp,
    contactEmail: catalogSettings.contactEmail || "",
    metaTitle: catalogSettings.metaTitle || "",
    metaDescription: catalogSettings.metaDescription || "",
    bannerImage: catalogSettings.bannerImage || "",
    aboutText: catalogSettings.aboutText || "",
    theme: catalogSettings.theme || "",
    instagram: catalogSettings.instagram || "",
    facebook: catalogSettings.facebook || "",
  });
  const debounceUpdate = useDebouncedValue(settings, 500);

  const updateFieldCatalog = useMutation(
    orpc.catalogSettings.update.mutationOptions({
      onSuccess: () => {
        toast("Catálogo atualizado!");
      },
      onError: () => {
        toast("Erro ao atualizar catálogo!");
      },
    })
  );

  const normalizePhone = (value = "") => value.replace(/\D/g, "");

  function onSubmit() {
    updateFieldCatalog.mutate({
      id: catalogSettings.id,
      isActive: debounceUpdate.isActive,
      showPrices: debounceUpdate.showPrices,
      showStock: debounceUpdate.showStock,
      allowOrders: debounceUpdate.allowOrders,
      whatsappNumber: normalizePhone(debounceUpdate.whatsappNumber) || "",
      showWhatsapp: debounceUpdate.showWhatsapp,
      contactEmail: debounceUpdate.contactEmail,
      metaTitle: debounceUpdate.metaTitle,
      metaDescription: debounceUpdate.metaDescription,
      bannerImage: debounceUpdate.bannerImage,
      aboutText: debounceUpdate.aboutText,
      theme: debounceUpdate.theme,
      instagram: debounceUpdate.instagram,
      facebook: debounceUpdate.facebook,
    });
  }

  return (
    <div className="bg-background">
      <main className="mx-auto max-w-7xl">
        <div className="flex flex-col">
          {/* Sidebar de navegação */}
          <Tabs defaultValue="geral">
            <div className="flex justify-between items-center overflow-x-auto">
              <TabsList>
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    {tab.label}{" "}
                  </TabsTrigger>
                ))}
              </TabsList>
              <Button className="hidden sm:flex" onClick={onSubmit}>
                Salvar
              </Button>
            </div>
            <TabsContent value="geral">
              <div className="space-y-6 mt-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Geral
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Configurações gerais
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
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input id="cnpj" placeholder="Ex: 12.345.678/0001-99" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aboutText">Sobre nós</Label>
                      <Textarea
                        id="aboutText"
                        placeholder="Ex: Digite uma breve descrição sobre a sua loja para que seus clientes possam conhecer um pouco mais sobre ela"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
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
                          setSettings({
                            ...settings,
                            isActive: checked,
                          })
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
                          setSettings({
                            ...settings,
                            showPrices: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between border-t border-border pt-6">
                      <div className="space-y-0.5">
                        <Label
                          htmlFor="showPrices"
                          className="text-base font-medium"
                        >
                          Mostrar Produtos fora do estoque
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Exibe os produtos que estão fora do estoque
                        </p>
                      </div>
                      <Switch id="showOutOfStock" />
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
                          setSettings({
                            ...settings,
                            showStock: checked,
                          })
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
                          setSettings({
                            ...settings,
                            allowOrders: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col border-t border-border pt-6">
                      <div className="space-y-0.5">
                        <Label
                          htmlFor="showPrices"
                          className="text-base font-medium"
                        >
                          Ordem de exibição de produtos
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Defina como deve ser a ordem de exivição dos seus
                          produtos no seu catálogo
                        </p>
                      </div>
                      <div className="mt-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                              Em ordem alfabética crescente de A a Z
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            {SORT_ORDER.map((order) => (
                              <div key={order.id}>
                                <DropdownMenuCheckboxItem>
                                  {order.label}
                                </DropdownMenuCheckboxItem>
                              </div>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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
                    <div className="space-y-2">
                      <Label htmlFor="ColorPicker">
                        Cor do tema do catálogo
                      </Label>
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
                        onChange={(e) =>
                          setSettings({ ...settings, theme: e.hex })
                        }
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="payment">
              <div className="space-y-6 mt-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Pagamento
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Configure as opções de pagamento do seu catálogo
                  </p>
                </div>

                <Card className="p-6">
                  <div className="space-y-6">
                    <Label>Formas de pagamento disponíveis</Label>
                    <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
                      {payments.map((payment) => (
                        <div
                          key={payment.id}
                          className="flex items-center gap-2"
                        >
                          <Checkbox id={payment.name} />
                          <Label htmlFor={payment.name}>{payment.name}</Label>
                        </div>
                      ))}
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
                          setSettings({
                            ...settings,
                            facebook: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kwai">KWAI</Label>
                      <Input
                        id="kwai"
                        placeholder="https://kwai.com/minhaloja"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="x">X (Twitter)</Label>
                      <Input id="x" placeholder="https://x.com/minhaloja" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="youtube">YouTube</Label>
                      <Input
                        id="youtube"
                        placeholder="https://youtube.com/minhaloja"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tiktok">TikTok</Label>
                      <Input
                        id="tiktok"
                        placeholder="https://tiktok.com/minhaloja"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="integrations">
              <div className="space-y-6 mt-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Integrações
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Conecte seu catálogo a meta
                  </p>
                </div>
                <Card className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="googleAnalytics">
                        ID do Google Analytics
                      </Label>
                      <Input
                        id="googleAnalytics"
                        placeholder="000000000000000"
                      />
                      <p className="text-sm text-muted-foreground">
                        Receba os principais eventos do seu eventos do seu
                        catálogo diretamente no Google Analytics. Faça análises
                        de tráfego e vendas.
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
                        Integre seu catálogo ao seu Meta Pixel (Facebook) e
                        tenha relatórios avançados sobre tráfego, campanhas e
                        conversões.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex items-end justify-end mt-4 sm:hidden">
          <Button onClick={onSubmit}>Salvar</Button>
        </div>
      </main>
    </div>
  );
}
