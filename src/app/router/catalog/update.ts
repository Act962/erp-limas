import { requireAuthMiddleware } from "@/app/middlewares/auth";
import { base } from "@/app/middlewares/base";
import {
  CatalogSortOrder,
  DeliveryMethod,
  FreightChargeType,
  FreightOption,
  PaymentMethod,
} from "@/generated/prisma/enums";
import prisma from "@/lib/db";
import z from "zod";

export const updateSettingsCatalog = base
  .use(requireAuthMiddleware)
  .route({
    method: "PUT",
    path: "/settings-catalog/:id",
    summary: "Atualizar configuração do catálogo",
    tags: ["settings-catalog"],
  })
  .input(
    z.object({
      id: z.string(),
      isActive: z.boolean().optional(),
      showPrices: z.boolean().optional(),
      showStock: z.boolean().optional(),
      sortOrder: z.enum(CatalogSortOrder).optional(),
      allowOrders: z.boolean().optional(),
      whatsappNumber: z.string().optional(),
      showWhatsapp: z.boolean().optional(),
      contactEmail: z.string().optional(),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      logo: z.string().optional(),
      bannerImages: z.string().array().optional(),
      aboutText: z.string().optional(),
      theme: z.string().optional(),
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      twitter: z.string().optional(),
      tiktok: z.string().optional(),
      youtube: z.string().optional(),
      kwai: z.string().optional(),
      cep: z.string().optional(),
      address: z.string().optional(),
      district: z.string().optional(),
      number: z.string().optional(),
      id_meta: z.string().optional(),
      pixel_meta: z.string().optional(),
      showProductWithoutStock: z.boolean().optional(),
      paymentMethodSettings: z.enum(PaymentMethod).array().optional(),
      deliveryMethods: z.enum(DeliveryMethod).array().optional(),
      freightOptions: z.enum(FreightOption).optional(),
      freightChargeType: z.enum(FreightChargeType).optional(),
      freightFixedValue: z.number().optional(),
      freightValuePerKg: z.number().optional(),
      freeShippingEnabled: z.boolean().optional(),
      freeShippingMinValue: z.number().optional(),
      cnpj: z.string().optional(),
      deliverySpecialInfo: z.string().optional(),
    })
  )
  .handler(async ({ input, errors }) => {
    const catalogSettings = await prisma.catalogSettings.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!catalogSettings) {
      throw errors.NOT_FOUND({
        message: "Configuração do catálogo não encontrada.",
      });
    }

    await prisma.catalogSettings.update({
      where: {
        id: input.id,
      },
      data: {
        isActive: input.isActive,
        showPrices: input.showPrices,
        showStock: input.showStock,
        sortOrder: input.sortOrder,
        allowOrders: input.allowOrders,
        whatsappNumber: input.whatsappNumber,
        showWhatsapp: input.showWhatsapp,
        contactEmail: input.contactEmail,
        metaTitle: input.metaTitle,
        metaDescription: input.metaDescription,
        logo: input.logo,
        bannerImages: input.bannerImages,
        aboutText: input.aboutText,
        theme: input.theme,
        instagram: input.instagram,
        facebook: input.facebook,
        twitter: input.twitter,
        tiktok: input.tiktok,
        youtube: input.youtube,
        kwai: input.kwai,
        cep: input.cep,
        address: input.address,
        district: input.district,
        number: input.number,
        id_meta: input.id_meta,
        pixel_meta: input.pixel_meta,
        showProductWithoutStock: input.showProductWithoutStock,
        paymentMethodSettings: input.paymentMethodSettings,
        freightOptions: input.freightOptions,
        freightChargeType: input.freightChargeType,
        freightFixedValue: input.freightFixedValue,
        freightValuePerKg: input.freightValuePerKg,
        freeShippingEnabled: input.freeShippingEnabled,
        freeShippingMinValue: input.freeShippingMinValue,
        deliveryMethods: input.deliveryMethods,
        deliverySpecialInfo: input.deliverySpecialInfo,
        cnpj: input.cnpj,
      },
    });
  });
