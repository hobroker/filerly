import {
  useContext,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { DirectoryContext } from "~/client/components/DirectoryView/contexts";

interface Props {
  rowId: string;
  value: string;
}

export const FileName = ({ value, rowId }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const { rowInEditMode } = useContext(DirectoryTableContext);
  const { refetch } = useContext(DirectoryContext);
  const [inputValue, setInputValue] = useState(value);
  const isInEditMode = rowInEditMode === rowId;

  useEffect(() => {
    if (!isInEditMode || !ref.current) return;
    ref.current.focus();
  }, [isInEditMode, value]);

  const onKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refetch();
      e.currentTarget.blur();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setInputValue(value);
      e.currentTarget.blur();
    }
  };

  return isInEditMode ? (
    <input
      ref={ref}
      type="text"
      className="prose-sm h-5 w-full border-0 bg-transparent p-0 pr-2"
      value={inputValue}
      onKeyDown={onKeyDown}
      onChange={(e) => setInputValue(e.target.value)}
    />
  ) : (
    <span className="prose-sm h-5 pr-2">{value}</span>
  );
};
