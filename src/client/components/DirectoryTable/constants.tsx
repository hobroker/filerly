import { Pencil, Trash } from "@phosphor-icons/react";
import {
  createColumnHelper,
  type Row,
  type Table,
} from "@tanstack/react-table";
import { Checkbox } from "~/client/components/Checkbox";
import { FileIcon } from "~/client/components/DirectoryTable/components/FileIcon";
import { type DirectoryTableRowData } from "~/client/components/DirectoryTable/types";
import { toFormattedDate } from "~/client/components/DirectoryTable/utils/toFormattedDate";
import { TableActions } from "~/client/components/TableActions/TableActions";
import { Text } from "~/client/components/Text";
import { bytesToHumanReadable } from "~/utils/filesize";

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
    cell: (info) => info.getValue(),
    header: () => <Text>Name</Text>,
  }),
  columnHelper.accessor("size", {
    cell: (info) =>
      info.row.original.isDirectory ? null : (
        <Text size="sm">{bytesToHumanReadable(info.getValue())}</Text>
      ),
    header: () => <span>Size</span>,
    meta: { className: "w-28" },
  }),
  columnHelper.accessor("lastModified", {
    cell: (info) => <Text>{toFormattedDate(info.getValue())}</Text>,
    header: () => <span>Last modified</span>,
    meta: { className: "w-28" },
  }),
  {
    id: "actions",
    cell: () => (
      <TableActions
        items={[
          { title: "Delete", icon: Trash, variation: "danger" },
          { title: "Edit", icon: Pencil },
        ]}
      />
    ),
    meta: { className: "w-6" },
  },
];
