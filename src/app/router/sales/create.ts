// import { requireAuthMiddleware } from "@/app/middlewares/auth";
// import { base } from "@/app/middlewares/base";
// import { requireOrgMiddleware } from "@/app/middlewares/org";
// import { SaleStatus } from "@/generated/prisma/enums";
// import prisma from "@/lib/db";
// import z from "zod";

// export const createSale = base
//   .use(requireAuthMiddleware)
//   .use(requireOrgMiddleware)
//   .route({
//     method: "POST",
//     summary: "Criar uma venda",
//     tags: ["sales"],
//   })
//   .input(
//     z.object({
//       organizationId: z.string(),
//       customerId: z.string(),
//       subtotal: z.number(),
//       total: z.number(),
//       saleNumber: z.number(),
//       status: z.enum(SaleStatus),
//       items: {
//         createMany: {
//           data: z.array(
//             z.object({
//               productId: z.string(),
//               productName: z.string(),
//               quantity: z.number(),
//               unitPrice: z.number(),
//               total: z.number(),
//             }),
//           ),
//         },
//       },
//     }),
//   )
//   .output(
//     z.object({
//       id: z.string(),
//     }),
//   )
//   .handler(async (context, input) => {
//     const sale = await prisma.sale.create({
//       data: {
//         organizationId: input.organizationId,
//         customerId: input.customerId,
//         subtotal: input.subtotal,
//         total: input.total,
//         saleNumber: input.saleNumber,
//         status: input.status,
//         items: {
//           createMany: {
//             data: input.items,
//           },
//         },
//       },
//     });
//     return { id: sale.id };
//   });
