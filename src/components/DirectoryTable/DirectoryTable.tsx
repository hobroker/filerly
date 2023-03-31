import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type File } from "~/common/types";
import { FileIcon } from "~/components/FileIcon/FileIcon";

const columnHelper = createColumnHelper<File>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => (
      <span className="flex gap-2">
        {
          <FileIcon
            filename={info.getValue()}
            isDirectory={info.row.original.isDirectory}
          />
        }
        {info.getValue()}
      </span>
    ),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor("size", {
    cell: (info) => info.getValue(),
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
      <thead className="bg-gray-50 text-xs uppercase text-gray-700">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="px-2 py-2">
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
          <tr key={row.id} className="border-b bg-white hover:bg-gray-50">
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
