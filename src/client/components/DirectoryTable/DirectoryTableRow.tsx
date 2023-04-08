import { type MouseEvent, useContext } from "react";
import { useRouter } from "next/router";
import { flexRender, type Row } from "@tanstack/react-table";
import classNames from "classnames";
import { DirectoryTableContext } from "~/client/components/DirectoryTable/contexts/DirectoryContext";
import { type DirectoryTableRowData } from "~/client/components/DirectoryTable/types";
import { DirectoryContext } from "~/client/contexts/DirectoryContext";
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
    window.getSelection()?.removeAllRanges();
  };

  return (
    <tr
      tabIndex={0}
      className={classNames("cursor-default border-b", {
        "bg-blue-100": row.getIsSelected(),
        "hover:bg-gray-100": !row.getIsSelected(),
      })}
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
