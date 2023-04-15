import { type KeyboardEvent, useContext, useState } from "react";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { useOnSuccess } from "~/client/components/DirectoryView/components/DirectoryTable/hooks/useOnSuccess";
import { useSelectedRows } from "~/client/components/DirectoryView/components/DirectoryTable/hooks/useSelectedRows";
import { useRenameFile } from "~/client/components/DirectoryView/hooks/useRenameFile";

interface Props {
  value: string;
}

export const useRenameFileMode = ({ value }: Props) => {
  const { setRowInEditMode } = useContext(DirectoryTableContext);
  const [inputValue, setInputValue] = useState(value);
  const onSuccess = useOnSuccess();
  const { paths } = useSelectedRows();
  const { mutate: rename } = useRenameFile({ onSuccess });

  const handleInputKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (typeof paths[0] !== "string" || !inputValue.length) return;
    if (e.key === "Enter") {
      e.preventDefault();
      rename({
        path: paths[0],
        newFilename: inputValue,
      });
      setRowInEditMode(undefined);
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setInputValue(value);
      e.currentTarget.blur();
    }
  };

  return {
    inputValue,
    setInputValue,
    handleInputKeyDown,
  };
};
