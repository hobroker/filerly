import { type MouseEvent, useContext } from "react";
import { useRouter } from "next/router";
import { flexRender, type Row } from "@tanstack/react-table";
import { not, mapObjIndexed, range } from "ramda";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { type DirectoryTableRowData } from "~/client/components/DirectoryView/components/DirectoryTable/types";
import { DirectoryContext } from "~/client/components/DirectoryView/contexts";
import { clearWindowSelection, cx } from "~/client/utils";
import { minMaxBy } from "~/client/utils/minMaxBy";

interface Props {
  row: Row<DirectoryTableRowData>;
  isEven: boolean;
}

export const DirectoryTableRow = ({ row, isEven }: Props) => {
  const router = useRouter();
  const { path } = useContext(DirectoryContext);
  const {
    setRowSelection,
    lastSelectedRow,
    setLastSelectedRow,
    lastSelectionRange,
    setLastSelectionRange,
    setRowInEditMode,
  } = useContext(DirectoryTableContext);

  const onDoubleClick = async () => {
    if (row.original.isDirectory) {
      setRowSelection({});
      setRowInEditMode(undefined);
      clearWindowSelection();

      await router.push([...path, row.original.name].join("/"));
    }
    console.log("Open the file");
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

    const hasShiftKey = event.shiftKey;
    const hasMetaKey = event.metaKey || event.ctrlKey;

    if (!hasShiftKey) {
      setLastSelectedRow(row.id);
    }
    let _lastSelectionRange = {};
    if (hasMetaKey) {
      _lastSelectionRange = {};
    }
    if (hasShiftKey && lastSelectedRow) {
      const selectionRange = range(
        ...minMaxBy<string>(Number, [row.id, lastSelectedRow])
      ).reduce((acc, id) => ({ ...acc, [id]: true }), {});
      const prevSelectionRange = mapObjIndexed(not, lastSelectionRange);
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
  const isRowSelected = row.getIsSelected();

  return (
    <tr
      className={cx("cursor-default", {
        "bg-primary-100": isRowSelected,
        "bg-base-100": !isEven && !isRowSelected,
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
