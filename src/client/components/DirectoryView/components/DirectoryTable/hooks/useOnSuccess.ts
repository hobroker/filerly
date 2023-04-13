import { useContext } from "react";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { DirectoryContext } from "~/client/components/DirectoryView/contexts";

export const useOnSuccess = () => {
  const { refetch } = useContext(DirectoryContext);
  const { setRowSelection } = useContext(DirectoryTableContext);

  return () => {
    refetch();
    setRowSelection({});
  };
};
