import prisma from "@/lib/db";
import { z } from "zod";
import { base } from "@/app/middlewares/base";
import { requireAuthMiddleware } from "@/app/middlewares/auth";
import { requireOrgMiddleware } from "@/app/middlewares/org";

export const listProducts = base
  .use(requireAuthMiddleware)
  .use(requireOrgMiddleware)
  .route({
    method: "GET",
    summary: "Listar todos os produtos",
    tags: ["products"],
  })
  .input(
    z.object({
      category: z.array(z.string()).optional(),
      sku: z.string().optional(),
      minValue: z.string().optional(),
      maxValue: z.string().optional(),
    })
  )
  .output(
    z.object({
      products: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          sku: z.string(),
          barcode: z.string(),
          category: z.string(),
          salePrice: z.number(),
          costPrice: z.number(),
          currentStock: z.number(),
          minStock: z.number(),

          image: z.string(),
          isActive: z.boolean(),
        })
      ),
    })
  )
  .handler(async ({ context, input }) => {
    console.log(input);
    try {
      const products = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          sku: true,
          barcode: true,
          category: {
            select: {
              name: true,
            },
          },
          salePrice: true,
          costPrice: true,
          currentStock: true,
          minStock: true,
          images: true,
          isActive: true,
          thumbnail: true,
        },
        where: {
          organizationId: context.org.id,
          category: {
            slug: {
              in: input.category,
            },
          },
          sku: {
            contains: input.sku,
          },
          salePrice: {
            gte: input.minValue ? Number(input.minValue) / 100 : undefined,
            lte: input.maxValue ? Number(input.maxValue) / 100 : undefined,
          },
        },
      });

      const productList = products.map((product) => ({
        id: product.id,
        name: product.name,
        sku: product.sku ?? "",
        barcode: product.barcode ?? "",
        category: product.category?.name ?? "",
        salePrice: product.salePrice.toNumber(),
        costPrice: product.costPrice.toNumber(),
        currentStock: product.currentStock.toNumber(),
        minStock: product.minStock.toNumber(),
        image: product.thumbnail ?? "",
        isActive: product.isActive,
      }));

      return {
        products: productList,
      };
    } catch (error) {
      throw error;
    }
  });
