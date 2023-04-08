import { useMemo } from "react";
import { Pencil, Trash } from "@phosphor-icons/react";
import {
  createColumnHelper,
  type Row,
  type Table,
} from "@tanstack/react-table";
import { Checkbox } from "~/client/components/Checkbox";
import { FileIcon } from "~/client/components/DirectoryTable/components/FileIcon";
import { toFormattedDate } from "~/client/components/DirectoryTable/utils/toFormattedDate";
import { TableActions } from "~/client/components/TableActions/TableActions";
import { Text } from "~/client/components/Text";
import { type File } from "~/common/types";
import { bytesToHumanReadable } from "~/utils/filesize";

const columnHelper = createColumnHelper<File>();

interface Props {
  mouseOverRowId?: string;
}

export const useDirectoryTableColumns = ({ mouseOverRowId }: Props) =>
  useMemo(
    () => [
      {
        id: "select",
        header: ({ table }: { table: Table<File> }) => (
          <div className="flex justify-center px-1">
            <Checkbox
              checked={table.getIsAllRowsSelected()}
              indeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          </div>
        ),
        cell: ({ row }: { row: Row<File> }) => {
          return (
            <div className="flex justify-center px-1">
              {row.id === mouseOverRowId || row.getIsSelected() ? (
                <Checkbox
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
    ],
    [mouseOverRowId]
  );
