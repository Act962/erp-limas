"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { useDebouncedValue } from "@/utils/use-debouced";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { phoneMask, normalizePhone } from "@/utils/format-phone";

import { tabs } from "./mock/catalog-moc";

import { GeneralTab } from "./tab-general";
import { VisibilityTab } from "./tab-visibility";
import { TabContact } from "./tab-contact";
import { TabCustomization } from "./tab-customization";
import { TabPayment } from "./tab-payment";
import { TabDelivery } from "./tab-delivery";
import { TabSocial } from "./tab-social";
import { TabIntegration } from "./tab-integration";
import {
  CatalogSortOrder,
  DeliveryMethod,
  FreightChargeType,
  FreightOption,
  PaymentMethod,
} from "@/generated/prisma/enums";
import { TabDomain } from "./tab-domain";

export interface CatalogSettingsProps {
  id: string;
  organizationId: string;
  isActive: boolean;
  showPrices: boolean;
  showStock: boolean;
  allowOrders: boolean;
  sortOrder: CatalogSortOrder | null;
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
  twitter: string;
  tiktok: string;
  youtube: string;
  kwai: string;
  cep: string;
  address: string;
  district: string;
  number: string;
  id_meta: string;
  pixel_meta: string;
  showProductWithoutStock: boolean;
  paymentMethodSettings: PaymentMethod[];
  freightOptions: FreightOption;
  freightChargeType: FreightChargeType;
  freightFixedValue: number;
  freightValuePerKg: number;
  freeShippingMinValue: number;
  freeShippingEnabled: boolean;
  deliveryMethods: DeliveryMethod[];
  deliverySpecialInfo: string;
  cnpj: string;
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
    sortOrder: catalogSettings.sortOrder,
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
    twitter: catalogSettings.twitter ?? "",
    tiktok: catalogSettings.tiktok ?? "",
    kwai: catalogSettings.kwai ?? "",
    youtube: catalogSettings.youtube ?? "",
    cep: catalogSettings.cep ?? "",
    address: catalogSettings.address ?? "",
    district: catalogSettings.district ?? "",
    number: catalogSettings.number ?? "",
    id_meta: catalogSettings.id_meta ?? "",
    pixel_meta: catalogSettings.pixel_meta ?? "",
    showProductWithoutStock: catalogSettings.showProductWithoutStock,
    paymentMethodSettings: catalogSettings.paymentMethodSettings,
    freightOptions: catalogSettings.freightOptions,
    freightChargeType: catalogSettings.freightChargeType,
    freightFixedValue: catalogSettings.freightFixedValue,
    freightValuePerKg: catalogSettings.freightValuePerKg,
    freeShippingMinValue: catalogSettings.freeShippingMinValue ?? 0,
    freeShippingEnabled: catalogSettings.freeShippingEnabled,
    deliveryMethods: catalogSettings.deliveryMethods,
    deliverySpecialInfo: catalogSettings.deliverySpecialInfo ?? "",
    cnpj: catalogSettings.cnpj ?? "",
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
      twitter: debounceUpdate.twitter,
      tiktok: debounceUpdate.tiktok,
      kwai: debounceUpdate.kwai,
      youtube: debounceUpdate.youtube,
      sortOrder: debounceUpdate.sortOrder || "ASC",
      cep: debounceUpdate.cep,
      address: debounceUpdate.address,
      district: debounceUpdate.district,
      number: debounceUpdate.number,
      id_meta: debounceUpdate.id_meta,
      pixel_meta: debounceUpdate.pixel_meta,
      showProductWithoutStock: debounceUpdate.showProductWithoutStock,
      cnpj: debounceUpdate.cnpj,
      paymentMethodSettings: debounceUpdate.paymentMethodSettings,
      freightOptions: debounceUpdate.freightOptions,
      freightChargeType: debounceUpdate.freightChargeType,
      freightFixedValue: debounceUpdate.freightFixedValue,
      freightValuePerKg: debounceUpdate.freightValuePerKg,
      freeShippingMinValue: debounceUpdate.freeShippingMinValue,
      freeShippingEnabled: debounceUpdate.freeShippingEnabled,
      deliveryMethods: debounceUpdate.deliveryMethods,
      deliverySpecialInfo: debounceUpdate.deliverySpecialInfo,
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
            <TabsContent value="domain">
              <TabDomain settings={settings} />
            </TabsContent>
            <TabsContent value="payment">
              <TabPayment setSettings={setSettings} settings={settings} />
            </TabsContent>
            <TabsContent value="delivery">
              <TabDelivery setSettings={setSettings} settings={settings} />
            </TabsContent>
            <TabsContent value="social">
              <TabSocial settings={settings} setSettings={setSettings} />
            </TabsContent>
            <TabsContent value="integrations">
              <TabIntegration settings={settings} setSettings={setSettings} />
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
