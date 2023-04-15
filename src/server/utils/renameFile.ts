import { rename } from "fs/promises";
import { basename } from "path";
import {
  type FileActionResultError,
  type FileActionResultSuccess,
  type FileActionsGroup,
} from "~/common/types";
import { groupFileActionResults } from "~/server/utils/groupFileActionResults";

export const renameFile = async (
  path: string,
  newFilename: string
): Promise<FileActionsGroup> => {
  const newPath = path.replace(basename(path), newFilename);

  return rename(path, newPath)
    .then<FileActionResultSuccess>(() => ({ path: newPath }))
    .catch<FileActionResultError>((error) => ({
      path: path,
      error: error as Error,
    }))
    .then((result) => groupFileActionResults([result]));
};
