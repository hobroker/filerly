import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createFolder } from "~/server/utils/createFolder";
import { readDirectory } from "~/server/utils/readDirectory";
import { removeFiles } from "~/server/utils/removeFiles";
import { renameFile } from "~/server/utils/renameFile";

export const fsRouter = createTRPCRouter({
  ls: publicProcedure
    .input(z.object({ path: z.string().array() }))
    .query(({ input: { path } }) => {
      if (!path.length) return [];

      return readDirectory(`/${path.join("/")}`);
    }),
  remove: publicProcedure
    .input(z.object({ paths: z.string().array() }))
    .mutation(({ input: { paths } }) => {
      if (!paths.length)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No paths provided",
        });

      return removeFiles(paths);
    }),
  move: publicProcedure
    .input(z.object({ path: z.string(), newFilename: z.string() }))
    .mutation(({ input: { path, newFilename } }) => {
      return renameFile(path, newFilename);
    }),
  mkdir: publicProcedure
    .input(z.object({ path: z.string() }))
    .mutation(({ input: { path } }) => {
      return createFolder(path);
    }),
});
