import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/router";
import { type File } from "~/common/types";
import { bytesToHumanReadable } from "~/utils/filesize";
import { FileName } from "~/client/components/DirectoryTable/components/FileName";
import { Pencil, Trash } from "@phosphor-icons/react";
import { TableActions } from "~/client/components/TableActions/TableActions";
import { LoadingState } from "~/client/components/DirectoryTable/components/LoadingState";
import classNames from "classnames";
import { type MetaType } from "~/client/components/DirectoryTable/types";
import { toFormattedDate } from "~/client/components/DirectoryTable/utils/toFormattedDate";
import { useContext } from "react";
import { DirectoryContext } from "~/client/contexts/DirectoryContext";

const columnHelper = createColumnHelper<File>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => (
      <FileName
        filename={info.getValue()}
        isDirectory={info.row.original.isDirectory}
      />
    ),
    header: () => <span>Name</span>,
    meta: {
      className: "pl-5",
    },
  }),
  columnHelper.accessor("size", {
    cell: (info) =>
      info.row.original.isDirectory
        ? null
        : bytesToHumanReadable(info.getValue()),
    header: () => <span>Size</span>,
    meta: {
      className: "w-28",
    },
  }),
  columnHelper.accessor("lastModified", {
    cell: (info) => toFormattedDate(info.getValue()),
    header: () => <span>Last modified</span>,
    meta: {
      className: "w-28a",
    },
  }),
  {
    id: "actions",
    meta: {
      className: "w-6",
    },
    cell: () => (
      <TableActions
        items={[
          { title: "Delete", icon: Trash, variation: "danger" },
          { title: "Edit", icon: Pencil },
        ]}
      />
    ),
  },
];

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
  const table = useReactTable<File>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onRowDoubleClick = async (row: Row<File>) => {
    if (row.original.isDirectory) {
      return router.push([...path, row.original.name].join("/"));
    }
    console.log("Open the file");
  };

  return (
    <table className="w-full whitespace-nowrap text-left text-sm">
      <thead className="bg-gray-100 text-xs uppercase text-gray-700">
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
                {header.isPlaceholder
                  ? null
                  : flexRender(
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
              className="border-b hover:bg-gray-50"
              onDoubleClick={() => void onRowDoubleClick(row)}
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
