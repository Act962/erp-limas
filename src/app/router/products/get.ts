import { requireAuthMiddleware } from "@/app/middlewares/auth";
import { base } from "@/app/middlewares/base";
import prisma from "@/lib/db";
import { ProductUnit } from "@/generated/prisma/enums";
import z from "zod";

export const getProduct = base
  .use(requireAuthMiddleware)
  .route({
    method: "GET",
    path: "/products/:id",
    summary: "Get a product by id",
  })
  .input(
    z.object({
      id: z.string(),
    })
  )
  .output(
    z.object({
      product: z.object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
        description: z.string().nullable(),
        sku: z.string().nullable(),
        barcode: z.string().nullable(),
        categoryId: z.string().nullable(),
        category: z.string().nullable(),
        unit: z.enum(ProductUnit),
        salePrice: z.number(),
        costPrice: z.number(),
        promotionalPrice: z.number().nullable(),
        currentStock: z.number(),
        minStock: z.number(),
        maxStock: z.number().nullable(),
        images: z.array(z.string()),
        thumbnail: z.string(),
        weight: z.number().nullable(),
        length: z.number().nullable(),
        width: z.number().nullable(),
        height: z.number().nullable(),
        isActive: z.boolean(),
        isFeatured: z.boolean(),
        trackStock: z.boolean(),
        createdAt: z.string(),
        updatedAt: z.string(),
      }),
    })
  )
  .handler(async ({ input, errors }) => {
    const product = await prisma.product.findUnique({
      where: {
        id: input.id,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        sku: true,
        barcode: true,
        categoryId: true,
        unit: true,
        salePrice: true,
        costPrice: true,
        promotionalPrice: true,
        currentStock: true,
        minStock: true,
        maxStock: true,
        images: true,
        thumbnail: true,
        weight: true,
        length: true,
        width: true,
        height: true,
        isActive: true,
        isFeatured: true,
        trackStock: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!product) {
      throw errors.NOT_FOUND({ message: "Produto não encontrado!" });
    }

    const productDetail = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description ?? null,
      sku: product.sku ?? null,
      barcode: product.barcode ?? null,
      categoryId: product.categoryId ?? null,
      category: product.category?.name ?? null,
      unit: product.unit,
      salePrice: product.salePrice.toNumber(),
      costPrice: product.costPrice.toNumber(),
      promotionalPrice: product.promotionalPrice
        ? product.promotionalPrice.toNumber()
        : null,
      currentStock: product.currentStock.toNumber(),
      minStock: product.minStock.toNumber(),
      maxStock: product.maxStock ? product.maxStock.toNumber() : null,
      images: product.images,
      thumbnail: product.thumbnail,
      weight: product.weight ? product.weight.toNumber() : null,
      length: product.length ? product.length.toNumber() : null,
      width: product.width ? product.width.toNumber() : null,
      height: product.height ? product.height.toNumber() : null,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      trackStock: product.trackStock,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    };

    return {
      product: productDetail,
    };
  });
