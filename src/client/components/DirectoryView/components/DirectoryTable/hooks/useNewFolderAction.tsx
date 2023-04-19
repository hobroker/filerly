import { basename, join } from "path";
import { useCallback, useContext } from "react";
import { type Row } from "@tanstack/react-table";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { useOnSuccess } from "~/client/components/DirectoryView/components/DirectoryTable/hooks/useOnSuccess";
import { type DirectoryTableRowData } from "~/client/components/DirectoryView/components/DirectoryTable/types";
import { getNextNewFilderName } from "~/client/components/DirectoryView/components/DirectoryTable/utils/getNextNewFilderName";
import { DirectoryContext } from "~/client/components/DirectoryView/contexts";
import { useCreateFolder } from "~/client/components/DirectoryView/hooks/useCreateFolder";

export const useNewFolderAction = () => {
  const { rawPath } = useContext(DirectoryContext);
  const { table, setRowInEditMode } = useContext(DirectoryTableContext);
  const onSuccess = useOnSuccess();
  const { mutate: mkdir } = useCreateFolder({
    onSuccess: async (_, { path }) => {
      await onSuccess();
      const row = await new Promise<Row<DirectoryTableRowData>>((resolve) => {
        const folderName = basename(path);
        const interval = setInterval(() => {
          const row = table
            .getRowModel()
            .rows.find(({ original: { name } }) => name === folderName);
          if (row) {
            clearInterval(interval);
            resolve(row);
          }
        }, 10);
      });
      setRowInEditMode(row.id);
    },
  });

  return useCallback(() => {
    const newName = getNextNewFilderName(
      table
        .getRowModel()
        .rows.reduce<string[]>(
          (acc, { original: { name, isDirectory } }) =>
            isDirectory ? [...acc, name] : acc,
          []
        )
    );
    mkdir({ path: join(rawPath, newName) });
  }, [mkdir, rawPath, table]);
};
