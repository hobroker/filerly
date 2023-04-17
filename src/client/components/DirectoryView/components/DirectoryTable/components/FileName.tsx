import { type MouseEvent, useContext } from "react";
import { FileNameEdit } from "~/client/components/DirectoryView/components/DirectoryTable/components/FileNameEdit";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { useSelectedRows } from "~/client/components/DirectoryView/components/DirectoryTable/hooks";

interface Props {
  rowId: string;
  value: string;
}

export const FileName = ({ value, rowId }: Props) => {
  const { rowInEditMode, setRowInEditMode } = useContext(DirectoryTableContext);
  const { singleRow } = useSelectedRows();
  const isInEditMode = rowInEditMode === rowId;
  const onClick = (event: MouseEvent<HTMLSpanElement>) => {
    // don't go in edit mode if double click
    if (event.detail === 2) return;
    if (singleRow && singleRow.id === rowId) {
      event.stopPropagation();
      setRowInEditMode(rowId);
    }
  };

  return isInEditMode ? (
    <FileNameEdit value={value} />
  ) : (
    <span className="prose-sm h-5 pr-2" onClick={onClick}>
      {value}
    </span>
  );
};
