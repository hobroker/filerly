import { type MouseEvent, useContext, useState } from "react";
import { useRouter } from "next/router";
import {
  type Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { LoadingState } from "~/client/components/DirectoryTable/components/LoadingState";
import { useDirectoryTableColumns } from "~/client/components/DirectoryTable/hooks/useDirectoryTableColumns";
import { type MetaType } from "~/client/components/DirectoryTable/types";
import { DirectoryContext } from "~/client/contexts/DirectoryContext";
import { useOnClickOutside } from "~/client/hooks/useOnClickOutside";
import { type File } from "~/common/types";

interface Props {
  data?: File[];
  isErrored?: boolean;
  isLoading?: boolean;
}

export const DirectoryTable = ({
  data = [],
  isErrored = false,
  isLoading = false,
}: Props) => {
  const router = useRouter();
  const { path } = useContext(DirectoryContext);
  const [rowSelection, setRowSelection] = useState({});
  const [mouseOverRowId, setMouseOverRowId] = useState<string>();
  const columns = useDirectoryTableColumns({ mouseOverRowId });
  const { ref } = useOnClickOutside<HTMLTableElement>(() =>
    setRowSelection({})
  );
  const table = useReactTable<File>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
  });

  const onRowDoubleClick = async (row: Row<File>) => {
    if (row.original.isDirectory) {
      setRowSelection({});

      return router.push([...path, row.original.name].join("/"));
    }
    console.log("Open the file");
  };
  const onRowClick =
    (row: Row<File>) => (event: MouseEvent<HTMLTableRowElement>) => {
      if (event.target instanceof HTMLInputElement) return;
      setRowSelection({ [row.id]: true });
    };
  const onRowMouseEnter = (row: Row<File>) => {
    setMouseOverRowId(row.id);
  };
  const onRowMouseLeave = () => {
    setMouseOverRowId(undefined);
  };

  return (
    <table ref={ref} className="w-full whitespace-nowrap text-left text-sm">
      <thead className="bg-gray-100 text-sm uppercase text-gray-700">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={classNames(
                  "h-6 p-0 first:rounded-bl-md last:rounded-br-md",
                  (header.column.columnDef.meta as MetaType)?.className
                )}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {isLoading || isErrored ? (
          <tr>
            <td className="h-6 p-0" colSpan={columns.length}>
              <LoadingState />
            </td>
          </tr>
        ) : (
          table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={classNames(
                "cursor-default border-b hover:bg-gray-50",
                {
                  "bg-gray-100": row.getIsSelected(),
                }
              )}
              onDoubleClick={() => void onRowDoubleClick(row)}
              onClick={onRowClick(row)}
              onMouseEnter={() => onRowMouseEnter(row)}
              onMouseLeave={onRowMouseLeave}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="h-6 p-0">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
