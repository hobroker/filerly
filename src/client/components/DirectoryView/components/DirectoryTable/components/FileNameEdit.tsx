import { useEffect, useRef } from "react";
import { useRenameFileMode } from "~/client/components/DirectoryView/components/DirectoryTable/hooks";

interface Props {
  value: string;
}

export const FileNameEdit = ({ value }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const { inputValue, setInputValue, handleInputKeyDown } = useRenameFileMode({
    value,
  });

  useEffect(() => {
    if (!ref.current) return;
    ref.current.select();
  }, [value]);

  return (
    <input
      ref={ref}
      type="text"
      className="prose-sm h-5 w-full border-0 bg-transparent p-0 pr-2"
      value={inputValue}
      onKeyDown={handleInputKeyDown}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};
