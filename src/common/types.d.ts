export interface File {
  name: string;
  isDirectory: boolean;
  size: number;
  lastModified: number;
}

export interface FileActionResultSuccess {
  path: string;
}

export interface FileActionResultError extends FileActionResultSuccess {
  error: Error;
}

export type FileActionResult = FileActionResultSuccess | FileActionResultError;

export interface FileActionsGroup {
  sucessful: FileActionResultSuccess[];
  errored: FileActionResultError[];
}
