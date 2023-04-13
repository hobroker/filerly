import { type ReactNode, useCallback } from "react";
import { ContextMenu } from "~/client/components/ContextMenu";
import { useFileActions } from "~/client/components/DirectoryView/components/DirectoryTable/hooks";
import { clearWindowSelection } from "~/client/utils";

interface Props {
  children: ReactNode;
}

export const DirectoryTableContextMenu = ({ children }: Props) => {
  const actions = useFileActions();
  const onClose = useCallback(() => clearWindowSelection(), []);

  return (
    <ContextMenu items={actions} onClose={onClose}>
      {children}
    </ContextMenu>
  );
};
