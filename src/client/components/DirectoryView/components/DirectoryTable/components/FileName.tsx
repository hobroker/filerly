import { useContext, useEffect, useRef } from "react";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { useRenameFileMode } from "~/client/components/DirectoryView/components/DirectoryTable/hooks";

interface Props {
  rowId: string;
  value: string;
}

export const FileName = ({ value, rowId }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const { rowInEditMode } = useContext(DirectoryTableContext);
  const isInEditMode = rowInEditMode === rowId;
  const { inputValue, setInputValue, handleInputKeyDown } = useRenameFileMode({
    value,
  });

  useEffect(() => {
    if (!isInEditMode || !ref.current) return;
    ref.current.select();
  }, [isInEditMode, value]);

  return isInEditMode ? (
    <input
      ref={ref}
      type="text"
      className="prose-sm h-5 w-full border-0 bg-transparent p-0 pr-2"
      value={inputValue}
      onKeyDown={handleInputKeyDown}
      onChange={(e) => setInputValue(e.target.value)}
    />
  ) : (
    <span className="prose-sm h-5 pr-2">{value}</span>
  );
};
