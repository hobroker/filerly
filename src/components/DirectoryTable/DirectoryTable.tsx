import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type File } from "~/common/types";
import { bytesToHumanReadable } from "~/utils/filesize";
import { FileName } from "~/components/DirectoryTable/components/FileName";

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
  }),
  columnHelper.accessor("size", {
    cell: (info) =>
      info.row.original.isDirectory
        ? null
        : bytesToHumanReadable(info.getValue()),
    header: () => <span>Size</span>,
  }),
];

interface Props {
  data: File[];
}

export const DirectoryTable = ({ data }: Props) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full whitespace-nowrap text-left text-sm">
      <thead className="bg-gray-100 text-xs uppercase text-gray-700">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-2 py-2 first:rounded-bl-md last:rounded-br-md"
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
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b hover:bg-gray-50">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-2 py-1">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
