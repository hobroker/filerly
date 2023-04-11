import { rm, rmdir, stat } from "fs/promises";

export const removeFiles = async (paths: string[]) => {
  const result = [];
  for (const path of paths) {
    try {
      const stats = await stat(path);
      if (stats.isDirectory()) {
        await rmdir(path, {
          recursive: true,
        });
      } else {
        await rm(path);
      }
      result.push({ path, success: true });
    } catch (error) {
      result.push({ path, error, success: false });
    }
  }

  return result;
};
