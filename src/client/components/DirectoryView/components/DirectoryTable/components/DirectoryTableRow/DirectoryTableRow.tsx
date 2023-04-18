import { flexRender, type Row } from "@tanstack/react-table";
import { useRowEvents } from "~/client/components/DirectoryView/components/DirectoryTable/components/DirectoryTableRow/hooks";
import { type DirectoryTableRowData } from "~/client/components/DirectoryView/components/DirectoryTable/types";
import { cx } from "~/client/utils";

interface Props {
  row: Row<DirectoryTableRowData>;
  isEven: boolean;
}

export const DirectoryTableRow = ({ row, isEven }: Props) => {
  const rowEvents = useRowEvents({ row });
  const isRowSelected = row.getIsSelected();

  return (
    <tr
      className={cx("cursor-default", {
        "bg-primary-100": isRowSelected,
        "bg-base-100": !isEven && !isRowSelected,
      })}
      data-row-id={row.id}
      {...rowEvents}
    >
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="h-6 p-0">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};
