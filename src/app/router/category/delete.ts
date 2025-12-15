import { requireAuthMiddleware } from "@/app/middlewares/auth";
import { base } from "@/app/middlewares/base";
import z from "zod";

export const deleteCategory = base
  .use(requireAuthMiddleware)
  .route({
    method: "DELETE",
    path: "/category/:id",
    summary: "Delete a category",
    tags: ["Category"],
  })
  .input(
    z.object({
      id: z.string(),
    })
  )
  .handler(async ({ context }) => {});
