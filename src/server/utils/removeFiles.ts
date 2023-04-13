import { rm, stat } from "fs/promises";
import { rimraf } from "rimraf";
import { type FileActionResult, type FileActionsGroup } from "~/common/types";
import { groupFileActionResults } from "~/server/utils/groupFileActionResults";

export const removeFiles = async (
  paths: string[]
): Promise<FileActionsGroup> => {
  const result: FileActionResult[] = [];
  for (const path of paths) {
    try {
      const stats = await stat(path);
      if (stats.isDirectory()) {
        await rimraf(path);
      } else {
        await rm(path);
      }
      result.push({ path });
    } catch (error) {
      result.push({ path, error: error as Error });
    }
  }

  return groupFileActionResults(result);
};
