import { requireAuthMiddleware } from "@/app/middlewares/auth";
import { base } from "@/app/middlewares/base";
import { requireOrgMiddleware } from "@/app/middlewares/org";
import {
  CatalogSortOrder,
  DeliveryMethod,
  FreightOption,
  PaymentMethod,
} from "@/generated/prisma/enums";
import prisma from "@/lib/db";
import z from "zod";

export const listSettingsCatalog = base
  .use(requireAuthMiddleware)
  .use(requireOrgMiddleware)
  .route({
    method: "GET",
    summary: "Listar configurações de catálogo",
    tags: ["settings-catalog"],
  })
  .output(
    z.object({
      catalogSettings: z.object({
        id: z.string(),
        organizationId: z.string(),
        isActive: z.boolean(),
        showPrices: z.boolean(),
        showStock: z.boolean(),
        allowOrders: z.boolean(),
        sortOrder: z.enum(CatalogSortOrder).nullable(),
        whatsappNumber: z.string().nullable(),
        showWhatsapp: z.boolean(),
        contactEmail: z.string().nullable(),
        metaTitle: z.string().nullable(),
        metaDescription: z.string().nullable(),
        bannerImage: z.string().nullable(),
        aboutText: z.string().nullable(),
        theme: z.string().nullable(),
        instagram: z.string().nullable(),
        facebook: z.string().nullable(),
        kwai: z.string().nullable(),
        tiktok: z.string().nullable(),
        twitter: z.string().nullable(),
        youtube: z.string().nullable(),
        cep: z.string().nullable(),
        address: z.string().nullable(),
        district: z.string().nullable(),
        number: z.string().nullable(),
        id_meta: z.string().nullable(),
        pixel_meta: z.string().nullable(),
        showProductWithoutStock: z.boolean(),
        paymentMethodSettings: z.enum(PaymentMethod).array(),
        freightOptions: z.enum(FreightOption).array(),
        deliveryMethods: z.enum(DeliveryMethod).array(),
        cnpj: z.string().nullable(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
    })
  )
  .handler(async ({ context }) => {
    const catalogSettings = await prisma.catalogSettings.upsert({
      where: {
        organizationId: context.org.id,
      },
      create: {
        organizationId: context.org.id,
      },
      update: {
        organizationId: context.org.id,
      },
    });

    return { catalogSettings };
  });
