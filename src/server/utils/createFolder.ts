import { mkdir } from "fs/promises";
import {
  type FileActionResultError,
  type FileActionResultSuccess,
} from "~/common/types";

export const createFolder = async (path: string) => {
  return mkdir(path)
    .then<FileActionResultSuccess>(() => ({ path }))
    .catch<FileActionResultError>((error) => ({
      path: path,
      error: error as Error,
    }));
};
