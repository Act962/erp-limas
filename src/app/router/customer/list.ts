import { requireAuthMiddleware } from "@/app/middlewares/auth";
import { base } from "@/app/middlewares/base";
import { requireOrgMiddleware } from "@/app/middlewares/org";
import { Customer, Sale } from "@/generated/prisma/client";
import prisma from "@/lib/db";
import z from "zod";

interface CustomerWithSales extends Customer {
  sales: Sale[];
}

export const listCustomer = base
  .use(requireAuthMiddleware)
  .use(requireOrgMiddleware)
  .output(
    z.object({
      customers: z.array(z.custom<CustomerWithSales>()),
    })
  )
  .handler(async ({ context }) => {
    const customer = await prisma.customer.findMany({
      where: {
        organizationId: context.org.id,
      },
      include: {
        sales: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return {
      customers: customer,
    };
  });
