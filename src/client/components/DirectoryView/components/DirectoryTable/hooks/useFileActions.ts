import { useContext, useMemo } from "react";
import { Pencil, Trash } from "@phosphor-icons/react";
import { compact } from "ramda-adjunct";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { useOnSuccess } from "~/client/components/DirectoryView/components/DirectoryTable/hooks/useOnSuccess";
import { useSelectedRows } from "~/client/components/DirectoryView/components/DirectoryTable/hooks/useSelectedRows";
import { useRemoveFiles } from "~/client/components/DirectoryView/hooks";
import { type DropdownMenuItemType } from "~/client/components/DropdownMenu/components/DropdownMenuItem";
import { pluralize } from "~/client/utils/pluralize";

export const useFileActions = (): DropdownMenuItemType[] => {
  const { paths, singleRow } = useSelectedRows();
  const onSuccess = useOnSuccess();
  const { setRowInEditMode } = useContext(DirectoryTableContext);
  const { mutate: remove } = useRemoveFiles({ onSuccess });

  return useMemo(() => {
    return compact([
      singleRow && {
        title: "Rename",
        icon: Pencil,
        onClick: () => setRowInEditMode(singleRow.id),
      },
      {
        title: "Delete",
        icon: Trash,
        variation: "danger",
        confirm: `Click again to delete the ${pluralize(paths.length, "file")}`,
        onClick: () => remove({ paths }),
      },
    ]);
  }, [paths, remove, setRowInEditMode, singleRow]);
};
