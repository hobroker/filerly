import { useContext, useMemo } from "react";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { DirectoryContext } from "~/client/components/DirectoryView/contexts";

export const useSelectedRows = () => {
  const { table, rowSelection } = useContext(DirectoryTableContext);
  const { path } = useContext(DirectoryContext);
  const selectedAbsolutePaths = useMemo(() => {
    return Object.keys(rowSelection)
      .map((id) => table.getRow(id).original.name)
      .map((filename) => `/${[...path, filename].join("/")}`);
  }, [path, rowSelection, table]);
  const isOneSelected = useMemo(
    () => Object.values(rowSelection).length === 1,
    [rowSelection]
  );

  return {
    paths: selectedAbsolutePaths,
    isOneSelected,
  };
};
