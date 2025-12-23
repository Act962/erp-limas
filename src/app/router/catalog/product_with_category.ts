import { base } from "@/app/middlewares/base";
import prisma from "@/lib/db";
import z, { string } from "zod";

export const getProductAndProductsByCategory = base
  .route({
    method: "GET",
    summary: "Listar produtos com e produtos com a catagoria relacionada",
    tags: ["products_selected_with_category"],
  })
  .input(
    z.object({
      subdomain: z.string(),
      productSlug: z.string(),
    })
  )
  .output(
    z.object({
      product: z.object({
        id: z.string(),
        isActive: z.boolean(),
        name: z.string(),
        description: z.string().nullable(),
        slug: z.string(),
        minStock: z.number(),
        categoryId: z.string().nullable(),
        weight: z.number().nullable(),
        thumbnail: z.string(),
        currentStock: z.number(),
        salePrice: z.number(),
        images: z.array(string()).nullable(),
      }),
      productsWithThisCategory: z.array(
        z.object({
          id: z.string(),
          isActive: z.boolean(),
          name: z.string(),
          slug: z.string(),
          thumbnail: z.string().nullable(),
        })
      ),
    })
  )
  .handler(async ({ input, errors }) => {
    try {
      const { subdomain } = input;
      const organization = await prisma.organization.findUnique({
        where: {
          subdomain,
        },
      });
      if (!organization) {
        throw errors.NOT_FOUND();
      }

      const product = await prisma.product.findUnique({
        where: {
          organizationId_slug: {
            organizationId: organization.id,
            slug: input.productSlug,
          },
        },
      });

      if (!product) {
        throw errors.NOT_FOUND();
      }

      if (!product.categoryId) {
        throw errors.NOT_FOUND();
      }

      const productsWithCategory = await prisma.product.findMany({
        where: {
          slug: {
            not: input.productSlug,
          },
          categoryId: product.categoryId,
          isActive: true,
        },
      });

      const productsList = productsWithCategory.map((product) => ({
        id: product.id,
        isActive: product.isActive,
        name: product.name,
        slug: product.slug,
        thumbnail: product.thumbnail,
      }));

      return {
        product: {
          ...product,
          salePrice: Number(product.salePrice),
          costPrice: Number(product.costPrice),
          currentStock: Number(product.currentStock),
          minStock: Number(product.minStock),
          weight: Number(product.weight),
        },
        productsWithThisCategory: productsList,
      };
    } catch (error) {
      throw errors.INTERNAL_SERVER_ERROR();
    }
  });
