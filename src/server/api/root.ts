import { createTRPCRouter } from "~/server/api/trpc";
import {fsRouter} from "~/server/api/routers/fs";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  fs: fsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
