import {
  type ChangeEvent,
  type KeyboardEvent,
  useContext,
  useState,
} from "react";
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
  const { singlePath } = useSelectedRows();
  const { mutate: rename } = useRenameFile({ onSuccess });

  const submit = () => {
    if (typeof singlePath !== "string" || !inputValue.length) return;
    rename({
      path: singlePath,
      newFilename: inputValue,
    });
    setRowInEditMode(undefined);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setInputValue(value);
      setRowInEditMode(undefined);
    }
  };

  const onBlur = () => {
    submit();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return {
    inputValue,
    setInputValue,
    onKeyDown,
    onChange,
    onBlur,
  };
};
