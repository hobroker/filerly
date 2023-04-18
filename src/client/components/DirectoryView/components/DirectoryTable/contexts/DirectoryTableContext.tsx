import { createContext, type ReactNode, useState } from "react";
import {
  getCoreRowModel,
  type OnChangeFn,
  type Table,
  useReactTable,
} from "@tanstack/react-table";
import { DIRECTORY_TABLE_COLUMNS as columns } from "~/client/components/DirectoryView/components/DirectoryTable/columns";
import { type DirectoryTableRowData } from "~/client/components/DirectoryView/components/DirectoryTable/types";

interface Props {
  children: ReactNode;
  data: DirectoryTableRowData[];
}

interface ContextType {
  table: Table<DirectoryTableRowData>;
  rowSelection: Record<string, boolean>;
  setRowSelection: OnChangeFn<Record<string, boolean>>;
  lastSelectedRow?: string;
  setLastSelectedRow: OnChangeFn<string | undefined>;
  lastSelectionRange: Record<string, boolean>;
  setLastSelectionRange: OnChangeFn<Record<string, boolean>>;
  rowInEditMode: string | undefined;
  setRowInEditMode: OnChangeFn<string | undefined>;
}

const DirectoryTableContext = createContext<ContextType>({} as ContextType);

const DirectoryTableProvider = ({ children, data }: Props) => {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [lastSelectedRow, setLastSelectedRow] = useState<string>();
  const [lastSelectionRange, setLastSelectionRange] = useState<
    Record<string, boolean>
  >({});
  const [rowInEditMode, setRowInEditMode] = useState<string>();
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
        rowSelection,
        setRowSelection,
        lastSelectedRow,
        setLastSelectedRow,
        lastSelectionRange,
        setLastSelectionRange,
        rowInEditMode,
        setRowInEditMode,
      }}
    >
      {children}
    </DirectoryTableContext.Provider>
  );
};

export { DirectoryTableProvider, DirectoryTableContext };
