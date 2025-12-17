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
import { delivery, payments, SORT_ORDER, tabs } from "./mock/catalog-moc";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GeneralTab } from "./tab-general";
import { VisibilityTab } from "./tab-visibility";
import { TabContact } from "./tab-contact";
import { TabCustomization } from "./tab-customization";
import { TabPayment } from "./tab-payment";
import { TabDelivery } from "./tab-delivery";
import { TabSocial } from "./tab-social";
import { TabIntegration } from "./tab-integration";

export interface CatalogSettingsProps {
  id: string;
  organizationId: string;
  isActive: boolean;
  showPrices: boolean;
  showStock: boolean;
  allowOrders: boolean;
  whatsappNumber: string;
  showWhatsapp: boolean;
  contactEmail: string;
  metaTitle: string;
  metaDescription: string;
  bannerImage: string;
  aboutText: string;
  theme: string;
  instagram: string;
  facebook: string;
}

export function CatalogSettings() {
  const { data } = useSuspenseQuery(orpc.catalogSettings.list.queryOptions());
  const { catalogSettings } = data;

  const [settings, setSettings] = useState<CatalogSettingsProps>({
    id: catalogSettings.id,
    organizationId: catalogSettings.organizationId,
    isActive: catalogSettings.isActive,
    showPrices: catalogSettings.showPrices,
    showStock: catalogSettings.showStock,
    allowOrders: catalogSettings.allowOrders,
    whatsappNumber: phoneMask(String(catalogSettings.whatsappNumber)) ?? "",
    showWhatsapp: catalogSettings.showWhatsapp,
    contactEmail: catalogSettings.contactEmail ?? "",
    metaTitle: catalogSettings.metaTitle ?? "",
    metaDescription: catalogSettings.metaDescription ?? "",
    bannerImage: catalogSettings.bannerImage ?? "",
    aboutText: catalogSettings.aboutText ?? "",
    theme: catalogSettings.theme ?? "",
    instagram: catalogSettings.instagram ?? "",
    facebook: catalogSettings.facebook ?? "",
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
              <GeneralTab settings={settings} setSettings={setSettings} />
            </TabsContent>
            <TabsContent value="visibility">
              <VisibilityTab settings={settings} setSettings={setSettings} />
            </TabsContent>
            <TabsContent value="contact">
              <TabContact settings={settings} setSettings={setSettings} />
            </TabsContent>
            <TabsContent value="customization">
              <TabCustomization settings={settings} setSettings={setSettings} />
            </TabsContent>
            <TabsContent value="payment">
              <TabPayment />
            </TabsContent>
            <TabsContent value="delivery">
              <TabDelivery />
            </TabsContent>
            <TabsContent value="social">
              <TabSocial settings={settings} setSettings={setSettings} />
            </TabsContent>
            <TabsContent value="integrations">
              <TabIntegration />
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
