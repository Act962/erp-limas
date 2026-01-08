// import { requireAuthMiddleware } from "@/app/middlewares/auth";
// import { base } from "@/app/middlewares/base";
// import { requireOrgMiddleware } from "@/app/middlewares/org";
// import prisma from "@/lib/db";
// import { MovementType, SaleStatus } from "@/generated/prisma/enums";
// import { z } from "zod";

// export const listStock = base
//   .use(requireAuthMiddleware)
//   .use(requireOrgMiddleware)
//   .route({
//     method: "GET",
//     path: "/dashboard",
//     summary: "list dashboard",
//   })

//   .input(
//     z.object({
//       dateInit: z.date().optional(),
//       dateEnd: z.date().optional(),
//     })
//   )

//   .output(
//     z.object({
//       salesTotal: z.number(),
//       productsActive: z.number(),
//       productsLowStock: z.number(),
//       salesToday: z.number(),
//       latestSales: z.array(
//         z.object({
//           id: z.string(),
//           createdAt: z.date(),
//           type: z.custom<MovementType>(),
//           quantity: z.number(),
//           previousStock: z.number(),
//           newStock: z.number(),
//           notes: z.string().nullable(),
//           product: z.object({
//             id: z.string(),
//             name: z.string(),
//             sku: z.string().nullable(),
//             status: z.custom<SaleStatus>(),
//             createdAt: z.date(),
//           }),
//           user: z.object({
//             id: z.string(),
//             name: z.string(),
//           }),
//         })
//       ),
//       productWithLowStock: z.array(
//         z.object({
//           id: z.string(),
//           name: z.string(),
//           sku: z.string().nullable(),
//           stock: z.number(),
//           stockMin: z.number(),
//         })
//       ),
//     })
//   )
//   .handler(async ({ errors, context }) => {
//     const org = await prisma.organization.findUnique({
//       where: {
//         id: context.org.id,
//       },
//     });

//     if (!org) {
//       throw errors.NOT_FOUND();
//     }

//     const salesProducts = await prisma.stockMovement.findMany({
//       where: {
//         organizationId: org.id,
//         type: MovementType.VENDA,
//       },
//     });

//     const activeProdutos = await prisma.product.findMany({
//       where: {
//         organizationId: org.id,
//         isActive: true,
//       },
//     });

//     const lowStockProducts = await prisma.product.findMany({
//       where: {
//         organizationId: org.id,
//         minStock: {
//           gt: 10,
//         },
//       },
//     });

//     const latestSales = await prisma.sale.findMany({
//       where: {
//         organizationId: org.id,
//       },
//       take: 5,
//       orderBy: {
//         createdAt: "desc",
//       },
//       include: {
//         customer: true,
//         items: true,
//       },
//     });

//     const latestSalesProducts = latestSales.map((sale) => ({
//       id: sale.id,
//       createdAt: sale.createdAt,
//       type: sale.type,
//       quantity: sale.quantity,
//       previousStock: sale.previousStock,
//       newStock: sale.newStock,
//       notes: sale.notes,
//       product: sale.productId,
//       user: sale.user,
//     }));

//     return {};
//   });
