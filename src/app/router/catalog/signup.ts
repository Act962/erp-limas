import { base } from "@/app/middlewares/base";
import prisma from "@/lib/db";
import z from "zod";
import { hash } from "bcrypt";

export const signupCatalog = base
  .route({
    method: "POST",
    summary: "Criar login do usuário do catálogo",
    tags: ["settings-catalog"],
  })
  .input(
    z.object({
      name: z.string(),
      email: z.string(),
      password: z.string().min(8),
      subdomain: z.string(),
    })
  )
  .handler(async ({ input, errors }) => {
    const organization = await prisma.organization.findUnique({
      where: {
        subdomain: input.subdomain,
      },
    });

    if (!organization) {
      throw errors.NOT_FOUND();
    }

    const user = await prisma.catalogUser.findMany({
      where: {
        email: {
          equals: input.email,
        },
      },
    });

    if (user.length > 0) {
      throw errors.BAD_REQUEST();
    }

    const hashedPassword = await hash(input.password, 8);

    const newUser = await prisma.catalogUser.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash: hashedPassword,
        organizationId: organization.id,
      },
    });

    const { passwordHash, ...userWithoutPassword } = newUser;

    return {
      userWithoutPassword,
    };
  });
