import { initTRPC } from "@trpc/server";
const t = initTRPC.create();
export const router = t.router;
// Allows us to create an endpoint that is
// publicly accessible.
export const publicProcedure = t.procedure;
