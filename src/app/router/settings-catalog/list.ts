import { requireAuthMiddleware } from "@/app/middlewares/auth";
import { base } from "@/app/middlewares/base";
import { requireOrgMiddleware } from "@/app/middlewares/org";
import prisma from "@/lib/db";
import z from "zod";

export const listCatalogSettings = base
  .use(requireAuthMiddleware)
  .use(requireOrgMiddleware)
  .route({
    method: "GET",
    summary: "Listar configurações de catálogo",
    tags: ["settings-catalog"],
  })
  .output(
    z.object({
      id: z.string(),
      organizationId: z.string(),
      isActive: z.boolean(),
      showPrices: z.boolean(),
      showStock: z.boolean(),
      allowOrders: z.boolean(),
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
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  )
  .handler(async ({ context }) => {
    let calatogSettings = await prisma.catalogSettings.findUnique({
      where: {
        organizationId: context.org.id,
      },
    });

    if (!calatogSettings) {
      calatogSettings = await prisma.catalogSettings.create({
        data: {
          organizationId: context.org.id,
        },
      });
    }

    return calatogSettings;
  });
