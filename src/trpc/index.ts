import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/server";
import { router, publicProcedure } from "./trpc";
import { TRPCError } from "@trpc/server";
export const appRouter = router({
  test: publicProcedure.query(() => {
    return "Hello World";
  }),
  authCallback: publicProcedure.query(() => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user.id || !user.email) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      });
    }

    return {
      success: true,
    }
  }),
});
export type AppRouter = typeof appRouter;
