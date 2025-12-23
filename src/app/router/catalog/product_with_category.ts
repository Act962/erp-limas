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
        category: z.object({
          name: z.string(),
          slug: z.string(),
        }),
      }),
      productsWithThisCategory: z.array(
        z.object({
          id: z.string(),
          isActive: z.boolean(),
          description: z.string().nullable(),
          name: z.string(),
          slug: z.string(),
          thumbnail: z.string(),
          salePrice: z.number(),
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
        include: {
          category: {
            select: {
              name: true,
              slug: true,
            },
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
        take: 4,
      });

      const productsList = productsWithCategory.map((product) => ({
        id: product.id,
        isActive: product.isActive,
        name: product.name,
        description: product.description,
        slug: product.slug,
        minStock: Number(product.minStock),
        categoryId: product.categoryId,
        weight: Number(product.weight),
        thumbnail: product.thumbnail,
        currentStock: Number(product.currentStock),
        salePrice: Number(product.salePrice),
        images: product.images,
      }));

      return {
        product: {
          ...product,
          salePrice: Number(product.salePrice),
          costPrice: Number(product.costPrice),
          currentStock: Number(product.currentStock),
          minStock: Number(product.minStock),
          weight: Number(product.weight),
          category: product.category as { name: string; slug: string },
        },
        productsWithThisCategory: productsList,
      };
    } catch (error) {
      throw errors.INTERNAL_SERVER_ERROR();
    }
  });
