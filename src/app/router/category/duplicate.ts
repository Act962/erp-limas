import { requireAuthMiddleware } from "@/app/middlewares/auth";
import { base } from "@/app/middlewares/base";
import prisma from "@/lib/db";
import { z } from "zod";

export const duplicateCategory = base
  .use(requireAuthMiddleware)
  .route({
    method: "POST",
    path: "/category/{id}/duplicate",
    summary: "Duplicar categoria",
    tags: ["Category"],
  })
  .input(
    z.object({
      id: z.string(),
    })
  )
  .output(
    z.object({
      categoryName: z.string(),
    })
  )
  .handler(async ({ errors, input }) => {
    const categoryExists = await prisma.category.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!categoryExists) {
      throw errors.BAD_REQUEST({
        message: "Categoria não existe",
      });
    }

    const newSlug = categoryExists.slug + `${Date.now()}`;

    const duplicatedCategory = await prisma.category.create({
      data: {
        name: categoryExists.name + " - Duplicado",
        organizationId: categoryExists.organizationId,
        slug: newSlug,
        parentId: categoryExists.parentId,
        description: categoryExists.description,
        image: categoryExists.image,
        order: categoryExists.order + 1,
      },
    });

    return {
      categoryName: duplicatedCategory.name,
    };
  });
