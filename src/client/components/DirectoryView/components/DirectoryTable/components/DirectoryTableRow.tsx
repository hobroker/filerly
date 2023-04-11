import { type MouseEvent, useContext } from "react";
import { useRouter } from "next/router";
import { flexRender, type Row } from "@tanstack/react-table";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts/DirectoryTableContext";
import { type DirectoryTableRowData } from "~/client/components/DirectoryView/components/DirectoryTable/types";
import { DirectoryContext } from "~/client/components/DirectoryView/contexts/DirectoryContext";
import { clearWindowSelection } from "~/client/utils/clearWindowSelection";
import { cx } from "~/client/utils/cx";
import { mapObject } from "~/client/utils/mapObject";
import { range } from "~/client/utils/range";

interface Props {
  row: Row<DirectoryTableRowData>;
}

export const DirectoryTableRow = ({ row }: Props) => {
  const router = useRouter();
  const { path } = useContext(DirectoryContext);
  const {
    setRowSelection,
    lastSelectedRow,
    setLastSelectedRow,
    lastSelectionRange,
    setLastSelectionRange,
  } = useContext(DirectoryTableContext);

  const onDoubleClick = async () => {
    if (row.original.isDirectory) {
      setRowSelection({});
      clearWindowSelection();

      await router.push([...path, row.original.name].join("/"));
    }
    console.log("Open the file");
  };
  const onClick = (event: MouseEvent<HTMLTableRowElement>) => {
    const hasShiftKey = event.shiftKey;
    const hasMetaKey = event.metaKey || event.ctrlKey;
    if (event.target instanceof HTMLInputElement) {
      if (event.target.checked) {
        setLastSelectedRow(row.id);
      }

      return;
    }
    if (!hasShiftKey) {
      setLastSelectedRow(row.id);
    }
    let _lastSelectionRange = {};
    if (hasMetaKey) {
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
    } else {
      setRowSelection((prev) => ({
        ...(hasMetaKey && prev),
        [row.id]: hasMetaKey ? !prev[row.id] : true,
      }));
    }
    setLastSelectionRange(_lastSelectionRange);
    clearWindowSelection();
  };

  return (
    <tr
      className={cx("cursor-default border-b", {
        "bg-primary-100": row.getIsSelected(),
        "hover:bg-base-100": !row.getIsSelected(),
      })}
      data-row-id={row.id}
      onDoubleClick={() => void onDoubleClick()}
      onClick={onClick}
    >
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="h-6 p-0">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};
