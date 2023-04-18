import { join } from "path";
import { useContext, useMemo } from "react";
import { Pencil, Trash, Folder } from "@phosphor-icons/react";
import { compact } from "ramda-adjunct";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { useOnSuccess } from "~/client/components/DirectoryView/components/DirectoryTable/hooks/useOnSuccess";
import { useSelectedRows } from "~/client/components/DirectoryView/components/DirectoryTable/hooks/useSelectedRows";
import { DirectoryContext } from "~/client/components/DirectoryView/contexts";
import { useRemoveFiles } from "~/client/components/DirectoryView/hooks";
import { useCreateFolder } from "~/client/components/DirectoryView/hooks/useCreateFolder";
import { type DropdownMenuItemType } from "~/client/components/DropdownMenu/components/DropdownMenuItem";

export const useFileActions = (): DropdownMenuItemType[] => {
  const { rawPath } = useContext(DirectoryContext);
  const { paths, singleRow } = useSelectedRows();
  const onSuccess = useOnSuccess();
  const { setRowInEditMode } = useContext(DirectoryTableContext);
  const { mutate: remove } = useRemoveFiles({ onSuccess });
  const { mutate: mkdir } = useCreateFolder({ onSuccess });

  return useMemo(() => {
    return compact([
      {
        title: "New Folder",
        icon: Folder,
        variation: "primary",
        onClick: () =>
          mkdir({ path: join(rawPath, `untitled folder ${Math.random()}`) }),
      },
      singleRow && {
        title: "Rename",
        icon: Pencil,
        onClick: () => setRowInEditMode(singleRow.id),
      },
      {
        title: "Delete",
        icon: Trash,
        variation: "danger",
        confirm: "Click again to confirm",
        onClick: () => remove({ paths }),
      },
    ]);
  }, [mkdir, paths, rawPath, remove, setRowInEditMode, singleRow]);
};
