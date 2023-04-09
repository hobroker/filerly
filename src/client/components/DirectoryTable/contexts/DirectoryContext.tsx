import { createContext, type ReactNode, useState } from "react";
import {
  getCoreRowModel,
  type OnChangeFn,
  type Table,
  useReactTable,
} from "@tanstack/react-table";
import { DIRECTORY_TABLE_COLUMNS as columns } from "~/client/components/DirectoryTable/constants";
import { type DirectoryTableRowData } from "~/client/components/DirectoryTable/types";

interface Props {
  children: ReactNode;
  data: DirectoryTableRowData[];
}

interface ContextType {
  table: Table<DirectoryTableRowData>;
  setRowSelection: OnChangeFn<Record<string, boolean>>;
  lastSelectedRow?: string;
  setLastSelectedRow: OnChangeFn<string | undefined>;
  lastSelectionRange: Record<string, boolean>;
  setLastSelectionRange: OnChangeFn<Record<string, boolean>>;
}

const DirectoryTableContext = createContext<ContextType>({} as ContextType);

function DirectoryTableProvider({ children, data }: Props) {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [lastSelectedRow, setLastSelectedRow] = useState<string>();
  const [lastSelectionRange, setLastSelectionRange] = useState<
    Record<string, boolean>
  >({});
  const table = useReactTable<DirectoryTableRowData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: (rowSelection) => {
      setLastSelectedRow(undefined);
      setRowSelection(rowSelection);
    },
  });

  return (
    <DirectoryTableContext.Provider
      value={{
        table,
        setRowSelection,
        lastSelectedRow,
        setLastSelectedRow,
        lastSelectionRange,
        setLastSelectionRange,
      }}
    >
      {children}
    </DirectoryTableContext.Provider>
  );
}

export { DirectoryTableProvider, DirectoryTableContext };
