import { base } from "@/app/middlewares/base";
import prisma from "@/lib/db";
import z, { string } from "zod";

export const listProducts = base
  .route({
    method: "GET",
    summary: "Listar produtos com e produtos com a catagoria relacionada",
    tags: ["products"],
  })
  .input(
    z.object({
      subdomain: z.string(),
      productId: z.string(),
    })
  )
  .output(
    z.object({
      categories: z.array(
        z.object({
          id: z.string(),
          isActive: z.boolean(),
          name: z.string(),
          slug: z.string(),
          image: z.string().nullable(),
          order: z.number(),
        })
      ),
      products: z.object({
        id: z.string(),
        isActive: z.boolean(),
        name: z.string(),
        slug: z.string(),
        minStock: z.number(),
        categoryId: z.string().nullable(),
        weight: z.number().nullable(),
        thumbnail: z.string(),
        currentStock: z.number(),
        salePrice: z.number(),
        images: z.array(string()).nullable(),
      }),
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
          id: input.productId,
        },
      });
      if (!product) {
        throw errors.NOT_FOUND();
      }
      if (!product.categoryId) {
        throw errors.NOT_FOUND();
      }
      const categories = await prisma.category.findMany({
        where: {
          id: product.categoryId,
        },
      });

      const categoryList = categories.map((category) => ({
        id: category.id,
        isActive: category.isActive,
        name: category.name,
        slug: category.slug,
        image: category.image,
        order: Number(category.order),
      }));

      return {
        products: {
          ...product,
          salePrice: Number(product.salePrice),
          costPrice: Number(product.costPrice),
          currentStock: Number(product.currentStock),
          minStock: Number(product.minStock),
          weight: Number(product.weight),
        },
        categories: categoryList,
      };
    } catch (error) {
      throw errors.INTERNAL_SERVER_ERROR();
    }
  });
