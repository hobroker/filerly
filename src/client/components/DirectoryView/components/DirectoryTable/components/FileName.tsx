import { type MouseEvent, useContext } from "react";
import { type Row } from "@tanstack/react-table";
import { FileNameEdit } from "~/client/components/DirectoryView/components/DirectoryTable/components/FileNameEdit";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { useSelectedRows } from "~/client/components/DirectoryView/components/DirectoryTable/hooks";
import { type DirectoryTableRowData } from "~/client/components/DirectoryView/components/DirectoryTable/types";

interface Props {
  row: Row<DirectoryTableRowData>;
}

export const FileName = ({ row }: Props) => {
  const { rowInEditMode, setRowInEditMode } = useContext(DirectoryTableContext);
  const { singleRow } = useSelectedRows();
  const isInEditMode = rowInEditMode === row.id;
  const onClick = (event: MouseEvent<HTMLSpanElement>) => {
    // don't go in edit mode if double click
    if (event.detail === 2) return;
    if (singleRow && singleRow.id === row.id) {
      event.stopPropagation();
      setRowInEditMode(row.id);
    }
  };

  return isInEditMode ? (
    <FileNameEdit value={row.original.name} />
  ) : (
    <span className="prose-sm h-5 pr-2" onClick={onClick}>
      {row.original.name}
    </span>
  );
};
