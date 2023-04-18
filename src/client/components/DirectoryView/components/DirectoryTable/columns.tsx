import {
  createColumnHelper,
  type Row,
  type Table,
} from "@tanstack/react-table";
import { Checkbox } from "~/client/components/Checkbox";
import { DirectoryTableDropdownMenu } from "~/client/components/DirectoryView/components/DirectoryTable/components/DirectoryTableDropdownMenu";
import { FileIcon } from "~/client/components/DirectoryView/components/DirectoryTable/components/FileIcon";
import { FileName } from "~/client/components/DirectoryView/components/DirectoryTable/components/FileName";
import { type DirectoryTableRowData } from "~/client/components/DirectoryView/components/DirectoryTable/types";
import { toFormattedDateOrTime } from "~/client/components/DirectoryView/components/DirectoryTable/utils";
import { bytesToHumanReadable } from "~/utils/bytesToHumanReadable";

const columnHelper = createColumnHelper<DirectoryTableRowData>();

export const DIRECTORY_TABLE_COLUMNS = [
  {
    id: "select",
    header: ({ table }: { table: Table<DirectoryTableRowData> }) => (
      <div className="flex justify-center px-1">
        <Checkbox
          className="h-4 w-4"
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      </div>
    ),
    cell: ({ row }: { row: Row<DirectoryTableRowData> }) => {
      return (
        <div className="flex justify-center px-1">
          {row.getIsSelected() ? (
            <Checkbox
              className="h-4 w-4"
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              indeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          ) : (
            <FileIcon
              filename={row.original.name}
              isDirectory={row.original.isDirectory}
            />
          )}
        </div>
      );
    },
    meta: { className: "w-8" },
  },
  columnHelper.accessor("name", {
    cell: (info) => <FileName row={info.row} />,
    header: () => "Name",
  }),
  columnHelper.accessor("size", {
    cell: (info) =>
      info.row.original.isDirectory ? null : (
        <span className="prose-sm pr-2">
          {bytesToHumanReadable(info.getValue())}
        </span>
      ),
    header: () => "Size",
    meta: { className: "w-24" },
  }),
  columnHelper.accessor("lastModified", {
    cell: (info) => (
      <span className="prose-sm pr-2">
        {toFormattedDateOrTime(info.getValue())}
      </span>
    ),
    header: () => "Last modified",
    meta: { className: "w-28" },
  }),
  {
    id: "actions",
    cell: ({ row }: { row: Row<DirectoryTableRowData> }) => (
      <DirectoryTableDropdownMenu rowId={row.id} />
    ),
    meta: { className: "w-6" },
  },
];
