import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRenameFileMode } from "~/client/components/DirectoryView/components/DirectoryTable/components/FileNameEdit/hooks";

interface Props {
  value: string;
}

export const FileNameEdit = ({ value }: Props) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { inputValue, onKeyDown, onChange, onBlur } = useRenameFileMode({
    value,
  });
  const [width, setWidth] = useState<number | undefined>();

  useLayoutEffect(() => {
    setWidth(spanRef.current?.offsetWidth);
  }, [inputValue]);

  useEffect(() => {
    if (!inputRef.current) return;
    setTimeout(() => {
      inputRef.current?.select();
    }, 1);
  }, [value]);

  return (
    <span>
      <span
        ref={spanRef}
        className="prose-sm pointer-events-none absolute h-5 max-w-full whitespace-pre opacity-0"
      >
        {inputValue}
      </span>
      <input
        ref={inputRef}
        type="text"
        className="prose-sm h-5 border-0 bg-transparent p-0"
        value={inputValue}
        maxLength={255}
        style={{ width }}
        onKeyDown={onKeyDown}
        onChange={onChange}
        onBlur={onBlur}
      />
    </span>
  );
};
