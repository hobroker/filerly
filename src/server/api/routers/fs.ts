import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { readDirectory } from "~/server/utils/readDirectory";

export const fsRouter = createTRPCRouter({
  ls: publicProcedure
    .input(z.object({ path: z.string().array() }))
    .query(async ({ input: { path } }) => {
      if (!path.length) return [];

      return readDirectory(`/${path.join("/")}`);
    }),
});
