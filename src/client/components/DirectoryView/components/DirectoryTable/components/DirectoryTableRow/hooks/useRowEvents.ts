import { type MouseEvent, useContext } from "react";
import { useRouter } from "next/router";
import { type Row } from "@tanstack/react-table";
import { omit, range } from "ramda";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { type DirectoryTableRowData } from "~/client/components/DirectoryView/components/DirectoryTable/types";
import { DirectoryContext } from "~/client/components/DirectoryView/contexts";
import { clearWindowSelection, minMaxBy } from "~/client/utils";

interface Props {
  row: Row<DirectoryTableRowData>;
}

export const useRowEvents = ({ row }: Props) => {
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

  const handleMultiSelect = (
    event: MouseEvent<HTMLTableRowElement>
  ): boolean => {
    const hasShiftKey = event.shiftKey;
    if (!hasShiftKey || !lastSelectedRow) {
      setLastSelectionRange({});

      return false;
    }

    const [min, max] = minMaxBy<string>(Number, [row.id, lastSelectedRow]);
    const selectionRange = range(min, max + 1).reduce(
      (acc, id) => ({ ...acc, [id]: true }),
      {}
    );
    setRowSelection((prev) => ({
      ...omit(Object.keys(lastSelectionRange), prev),
      ...selectionRange,
    }));
    setLastSelectionRange(selectionRange);

    return true;
  };

  const onClick = (event: MouseEvent<HTMLTableRowElement>) => {
    clearWindowSelection();

    if (handleCheckboxChange(event)) return;
    if (handleMultiSelect(event)) return;

    const hasShiftKey = event.shiftKey;
    const hasMetaKey = event.metaKey || event.ctrlKey;

    if (!hasShiftKey) {
      setLastSelectedRow(row.id);
    }

    setRowSelection((prev) => ({
      ...(hasMetaKey && prev),
      [row.id]: hasMetaKey ? !prev[row.id] : true,
    }));
  };

  return { onClick, onDoubleClick };
};
