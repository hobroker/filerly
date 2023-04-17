import { type MouseEvent, useContext } from "react";
import { FileNameEdit } from "~/client/components/DirectoryView/components/DirectoryTable/components/FileNameEdit";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";

interface Props {
  rowId: string;
  value: string;
}

export const FileName = ({ value, rowId }: Props) => {
  const { rowInEditMode, setRowInEditMode, rowSelection } = useContext(
    DirectoryTableContext
  );
  const isInEditMode = rowInEditMode === rowId;
  const onClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (event.detail === 2) return;
    const selectedRowIDs = Object.keys(rowSelection);
    const isOneSelected = selectedRowIDs.length === 1;
    if (isOneSelected && selectedRowIDs[0] === rowId) {
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
