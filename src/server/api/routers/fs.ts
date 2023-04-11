import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { readDirectory } from "~/server/utils/readDirectory";
import { removeFiles } from "~/server/utils/removeFiles";

export const fsRouter = createTRPCRouter({
  ls: publicProcedure
    .input(z.object({ path: z.string().array() }))
    .query(async ({ input: { path } }) => {
      if (!path.length) return [];

      return readDirectory(`/${path.join("/")}`);
    }),
  remove: publicProcedure
    .input(z.object({ paths: z.string().array() }))
    .mutation(async ({ input: { paths } }) => {
      if (!paths.length) throw new Error("No paths provided");

      return removeFiles(paths);
    }),
});
