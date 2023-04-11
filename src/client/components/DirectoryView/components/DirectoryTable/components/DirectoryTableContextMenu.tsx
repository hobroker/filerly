import { type ReactNode, useCallback, useContext, useMemo } from "react";
import { Pencil, Trash } from "@phosphor-icons/react";
import { compact } from "ramda-adjunct";
import { ContextMenu } from "~/client/components/ContextMenu";
import { type ShortcutMenuItem } from "~/client/components/ContextMenu/types";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { clearWindowSelection } from "~/client/utils";

interface Props {
  children: ReactNode;
}

export const DirectoryTableContextMenu = ({ children }: Props) => {
  const { rowSelection } = useContext(DirectoryTableContext);

  const items: ShortcutMenuItem[] = useMemo(() => {
    const isOneSelected = Object.values(rowSelection).length === 1;

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
        onClick: () => console.log("Delete"),
      },
    ]);
  }, [rowSelection]);
  const onClose = useCallback(() => clearWindowSelection(), []);

  return (
    <ContextMenu items={items} onClose={onClose}>
      {children}
    </ContextMenu>
  );
};
