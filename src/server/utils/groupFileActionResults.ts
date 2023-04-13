import {
  type FileActionResult,
  type FileActionResultError,
  type FileActionResultSuccess,
  type FileActionsGroup,
} from "~/common/types";

export const groupFileActionResults = (
  data: FileActionResult[]
): FileActionsGroup => {
  const sucessful = data.filter(
    (item): item is FileActionResultSuccess => !("error" in item)
  );
  const errored = data.filter(
    (item): item is FileActionResultError => "error" in item
  );

  return {
    sucessful,
    errored,
  };
};
