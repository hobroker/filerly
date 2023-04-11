import { Pencil, Trash } from "@phosphor-icons/react";
import { compact } from "ramda-adjunct";
import { useOnSuccess } from "~/client/components/DirectoryView/components/DirectoryTable/hooks/useOnSuccess";
import { useSelectedRows } from "~/client/components/DirectoryView/components/DirectoryTable/hooks/useSelectedRows";
import { type DropdownMenuItemType } from "~/client/components/DropdownMenu/components/DropdownMenuItem";
import { useRemoveFiles } from "~/client/hooks/actions/useRemoveFiles";

export const useFileActions = (): DropdownMenuItemType[] => {
  const { paths } = useSelectedRows();
  const isOneSelected = paths.length === 1;
  const onSuccess = useOnSuccess();
  const remove = useRemoveFiles({ onSuccess });

  return compact([
    isOneSelected && {
      title: "Rename",
      icon: Pencil,
      onClick: () => console.log("Rename"),
    },
    {
      title: "Delete",
      icon: Trash,
      variation: "danger",
      onClick: () => remove({ paths }),
    },
  ]);
};
