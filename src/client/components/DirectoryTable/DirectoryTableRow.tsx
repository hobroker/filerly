import { type MouseEvent, useContext } from "react";
import { useRouter } from "next/router";
import { flexRender, type OnChangeFn, type Row } from "@tanstack/react-table";
import classNames from "classnames";
import { type DirectoryTableRowData } from "~/client/components/DirectoryTable/types";
import { DirectoryContext } from "~/client/contexts/DirectoryContext";
import { mapObject } from "~/client/utils/mapObject";
import { range } from "~/client/utils/range";

interface Props {
  row: Row<DirectoryTableRowData>;
  setRowSelection: OnChangeFn<Record<string, boolean>>;
  setLastSelectedRow: OnChangeFn<string | undefined>;
  lastSelectedRow?: string;
  lastSelectionRange: Record<string, boolean>;
  setLastSelectionRange: OnChangeFn<Record<string, boolean>>;
}

export const DirectoryTableRow = ({
  row,
  setRowSelection,
  setLastSelectedRow,
  lastSelectedRow,
  lastSelectionRange,
  setLastSelectionRange,
}: Props) => {
  const router = useRouter();
  const { path } = useContext(DirectoryContext);

  const onRowDoubleClick = async () => {
    if (row.original.isDirectory) {
      setRowSelection({});

      await router.push([...path, row.original.name].join("/"));
    }
    console.log("Open the file");
  };
  const onRowClick = (event: MouseEvent<HTMLTableRowElement>) => {
    event.preventDefault();
    const hasShiftKey = event.shiftKey;
    if (event.target instanceof HTMLInputElement) {
      if (event.target.checked) {
        setLastSelectedRow(row.id);
      }

      return;
    }
    if (!hasShiftKey) {
      setLastSelectedRow(row.id);
    }
    setRowSelection((prev) => ({
      ...(event.metaKey && prev),
      [row.id]: event.metaKey ? !prev[row.id] : true,
    }));
    let _lastSelectionRange = {};
    if (event.metaKey) {
      _lastSelectionRange = {};
    }
    if (hasShiftKey && lastSelectedRow) {
      const selectionRange = range(row.id, lastSelectedRow).reduce(
        (acc, id) => ({ ...acc, [id]: true }),
        {}
      );
      const prevSelectionRange = mapObject(
        (value) => !value,
        lastSelectionRange
      );
      setRowSelection((prev) => ({
        ...prev,
        ...prevSelectionRange,
        ...selectionRange,
      }));
      _lastSelectionRange = selectionRange;
    }
    setLastSelectionRange(_lastSelectionRange);
    window.getSelection()?.removeAllRanges();
  };

  return (
    <tr
      className={classNames("cursor-default border-b", {
        "bg-blue-100": row.getIsSelected(),
        "hover:bg-gray-100": !row.getIsSelected(),
      })}
      onDoubleClick={() => void onRowDoubleClick()}
      onClick={onRowClick}
    >
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="h-6 p-0">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};
