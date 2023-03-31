import { readdir, stat } from "fs/promises";
import { join } from "path";
import { type File } from "~/common/types";

export const readDirectory = async (absolutePath: string): Promise<File[]> => {
  const filenames: string[] = await readdir(absolutePath);

  return Promise.all(
    filenames.map((item) =>
      stat(join(absolutePath, item)).then((stats) => ({
        name: item,
        isDirectory: stats.isDirectory(),
        size: stats.size,
      }))
    )
  );
};
