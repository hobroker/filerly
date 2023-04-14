import { type MouseEvent, useContext } from "react";
import { useRouter } from "next/router";
import { flexRender, type Row } from "@tanstack/react-table";
import { not } from "ramda";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { type DirectoryTableRowData } from "~/client/components/DirectoryView/components/DirectoryTable/types";
import { DirectoryContext } from "~/client/components/DirectoryView/contexts";
import { clearWindowSelection, cx, mapObject, range } from "~/client/utils";

interface Props {
  row: Row<DirectoryTableRowData>;
}

export const DirectoryTableRow = ({ row }: Props) => {
  const router = useRouter();
  const { path } = useContext(DirectoryContext);
  const {
    rowSelection,
    setRowSelection,
    lastSelectedRow,
    setLastSelectedRow,
    lastSelectionRange,
    setLastSelectionRange,
    setRowIsInEditMode,
  } = useContext(DirectoryTableContext);
  const selectedRowIDs = Object.keys(rowSelection);
  const isOneSelected = selectedRowIDs.length === 1;

  const onDoubleClick = async () => {
    if (row.original.isDirectory) {
      setRowSelection({});
      clearWindowSelection();

      await router.push([...path, row.original.name].join("/"));
    }
    console.log("Open the file");
  };

  const handleRename = (event: MouseEvent<HTMLTableRowElement>): boolean => {
    const clickedOnFilename =
      (event.target as HTMLElement)?.dataset?.["column"] === "name";
    if (
      !(isOneSelected && selectedRowIDs[0] === row.id && !clickedOnFilename)
    ) {
      return false;
    }
    setRowIsInEditMode(row.id);

    return true;
  };

  const handleCheckboxChange = (
    event: MouseEvent<HTMLTableRowElement>
  ): boolean => {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.checked) {
        setLastSelectedRow(row.id);
      }

      return true;
    }

    return false;
  };

  const onClick = (event: MouseEvent<HTMLTableRowElement>) => {
    if (handleCheckboxChange(event)) return;
    if (handleRename(event)) return;

    const hasShiftKey = event.shiftKey;
    const hasMetaKey = event.metaKey || event.ctrlKey;

    setRowIsInEditMode(undefined);
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
      const prevSelectionRange = mapObject(not, lastSelectionRange);
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
