import { auth } from "@/lib/auth";
import { base } from "../middlewares/base";
import { ORPCError } from "@orpc/server";

export const requireAuthMiddleware = base.middleware(
  async ({ context, next }) => {
    const sessionData = await auth.api.getSession({
      headers: context.headers,
    });

    if (!sessionData?.session || !sessionData?.user) {
      throw new ORPCError("UNAUTHORIZED");
    }

    // Adds session and user to the context
    return next({
      context: {
        session: sessionData.session,
        user: sessionData.user,
      },
    });
  }
);
