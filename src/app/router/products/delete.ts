import prisma from "@/lib/db";
import { z } from "zod";
import { base } from "@/app/middlewares/base";
import { requireAuthMiddleware } from "@/app/middlewares/auth";

export const deleteProduct = base
  .use(requireAuthMiddleware)
  .route({
    method: "DELETE",
    summary: "Deletar um produto",
    tags: ["products"],
  })
  .input(
    z.object({
      productId: z.string(),
    })
  )
  .output(
    z.object({
      productId: z.string(),
      productName: z.string(),
    })
  )
  .handler(async ({ input, errors }) => {
    try {
      if (!input.productId) {
        throw errors.BAD_REQUEST;
      }

      const product = await prisma.product.delete({
        where: {
          id: input.productId,
        },
      });

      return {
        productId: product.id,
        productName: product.name,
      };
    } catch (error) {
      throw error;
    }
  });
