import { useContext, useMemo } from "react";
import { Folder, Pencil, Trash } from "@phosphor-icons/react";
import { compact } from "ramda-adjunct";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { useNewFolderAction } from "~/client/components/DirectoryView/components/DirectoryTable/hooks/useNewFolderAction";
import { useOnSuccess } from "~/client/components/DirectoryView/components/DirectoryTable/hooks/useOnSuccess";
import { useSelectedRows } from "~/client/components/DirectoryView/components/DirectoryTable/hooks/useSelectedRows";
import { useRemoveFiles } from "~/client/components/DirectoryView/hooks";
import { type DropdownMenuItemType } from "~/client/components/DropdownMenu/components/DropdownMenuItem";

export const useFileActions = (): DropdownMenuItemType[] => {
  const { paths, singleRow } = useSelectedRows();
  const onSuccess = useOnSuccess();
  const { setRowInEditMode } = useContext(DirectoryTableContext);
  const { mutate: remove } = useRemoveFiles({ onSuccess });
  const mkdir = useNewFolderAction();

  return useMemo(() => {
    return compact([
      {
        title: "New Folder",
        icon: Folder,
        variation: "primary",
        onClick: mkdir,
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
  }, [mkdir, paths, remove, setRowInEditMode, singleRow]);
};
