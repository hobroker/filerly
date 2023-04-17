import { useContext, useMemo } from "react";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { DirectoryContext } from "~/client/components/DirectoryView/contexts";

export const useSelectedRows = () => {
  const { table, rowSelection } = useContext(DirectoryTableContext);
  const { path } = useContext(DirectoryContext);
  const rows = useMemo(() => {
    return Object.keys(rowSelection).map((id) => table.getRow(id));
  }, [rowSelection, table]);
  const paths = useMemo(() => {
    return rows.map(
      ({ original: { name } }) => `/${[...path, name].join("/")}`
    );
  }, [path, rows]);
  const singlePath = useMemo(() => {
    if (typeof paths[0] === "undefined") return undefined;

    return paths[0];
  }, [paths]);
  const singleRow = useMemo(() => {
    if (typeof rows[0] === "undefined") return undefined;

    return rows[0];
  }, [rows]);

  return {
    paths,
    singlePath,
    singleRow,
    rows,
  };
};
