import { useContext } from "react";
import { FileNameEdit } from "~/client/components/DirectoryView/components/DirectoryTable/components/FileNameEdit";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";

interface Props {
  rowId: string;
  value: string;
}

export const FileName = ({ value, rowId }: Props) => {
  const { rowInEditMode } = useContext(DirectoryTableContext);
  const isInEditMode = rowInEditMode === rowId;

  return isInEditMode ? (
    <FileNameEdit value={value} />
  ) : (
    <span className="prose-sm h-5 pr-2">{value}</span>
  );
};
