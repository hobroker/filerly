import { type MouseEvent, useContext } from "react";
import { useRouter } from "next/router";
import {
  flexRender,
  type OnChangeFn,
  type Row,
  type Table,
} from "@tanstack/react-table";
import classNames from "classnames";
import { type DirectoryTableRowData } from "~/client/components/DirectoryTable/types";
import { DirectoryContext } from "~/client/contexts/DirectoryContext";
import { type File } from "~/common/types";

interface Props {
  row: Row<DirectoryTableRowData>;
  table: Table<DirectoryTableRowData>;
  setRowSelection: OnChangeFn<Record<string, boolean>>;
  setLastSelectedRow: OnChangeFn<string | undefined>;
}

export const DirectoryTableRow = ({
  row,
  table,
  setRowSelection,
  setLastSelectedRow,
}: Props) => {
  const router = useRouter();
  const { path } = useContext(DirectoryContext);

  const onRowDoubleClick = async (row: Row<File>) => {
    if (row.original.isDirectory) {
      setRowSelection({});

      return router.push([...path, row.original.name].join("/"));
    }
    console.log("Open the file");
  };
  const onRowClick =
    (row: Row<File>) => (event: MouseEvent<HTMLTableRowElement>) => {
      if (event.target instanceof HTMLInputElement) {
        if (event.target.checked) {
          setLastSelectedRow(row.id);
        }

        return;
      }
      setRowSelection({ [row.id]: true });
      setLastSelectedRow(row.id);
    };
  const onRowMouseEnter = (row: Row<File>) => {
    if (table.getState().rowSelection[row.id]) return;
    setRowSelection((prev) => ({
      ...prev,
      [row.id]: false,
    }));
  };
  const onRowMouseLeave = (row: Row<File>) => {
    if (table.getState().rowSelection[row.id] === false) {
      setRowSelection(({ [row.id]: _, ...rest }) => rest);
    }
  };

  return (
    <tr
      className={classNames("cursor-default border-b hover:bg-gray-50", {
        "bg-gray-100": row.getIsSelected(),
      })}
      onDoubleClick={() => void onRowDoubleClick(row)}
      onClick={onRowClick(row)}
      onMouseEnter={() => onRowMouseEnter(row)}
      onMouseLeave={() => onRowMouseLeave(row)}
    >
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="h-6 p-0">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};
