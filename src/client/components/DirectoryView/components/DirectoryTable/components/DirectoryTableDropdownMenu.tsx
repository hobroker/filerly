import { useCallback, useContext } from "react";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { useFileActions } from "~/client/components/DirectoryView/components/DirectoryTable/hooks";
import { DropdownMenu } from "~/client/components/DropdownMenu/DropdownMenu";

interface Props {
  rowId: string;
}

export const DirectoryTableDropdownMenu = ({ rowId }: Props) => {
  const { setRowSelection } = useContext(DirectoryTableContext);
  const actions = useFileActions();
  const onOpen = useCallback(() => {
    setRowSelection({ [rowId]: true });
  }, [rowId, setRowSelection]);

  return <DropdownMenu items={actions} onOpen={onOpen} />;
};
