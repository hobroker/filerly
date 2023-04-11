import { type ReactNode, useCallback, useContext, useMemo } from "react";
import { Pencil, Trash } from "@phosphor-icons/react";
import { compact } from "ramda-adjunct";
import { DirectoryTableContext } from "~/client/components/DirectoryTable/contexts/DirectoryContext";
import { ShortcutMenu } from "~/client/components/ShortcutMenu";
import { type ShortcutMenuItem } from "~/client/components/ShortcutMenu/types";
import { clearWindowSelection } from "~/client/utils/clearWindowSelection";

interface Props {
  children: ReactNode;
}

export const DirectoryTableShortcutMenu = ({ children }: Props) => {
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
    <ShortcutMenu items={items} onClose={onClose}>
      {children}
    </ShortcutMenu>
  );
};
