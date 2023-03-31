import { readdir, stat } from "fs/promises";
import { join } from "path";
import { type File } from "~/common/types";

export const readDirectory = async (absolutePath: string): Promise<File[]> => {
  const filenames: string[] = await readdir(absolutePath);

  const files = await Promise.all(
    filenames.map(async (item) => {
      const stats = await stat(join(absolutePath, item));

      return {
        name: item,
        isDirectory: stats.isDirectory(),
        size: stats.size,
      };
    })
  );

  return files.sort((a, b) =>
    a.isDirectory === b.isDirectory ? 0 : a.isDirectory ? -1 : 1
  );
};
