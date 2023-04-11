import { useContext } from "react";
import { DirectoryTableContent } from "~/client/components/DirectoryView/components/DirectoryTable/components/DirectoryTableContent";
import { DirectoryTableProvider } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { type DirectoryTableRowData } from "~/client/components/DirectoryView/components/DirectoryTable/types";
import { ToastContext } from "~/client/components/Toast/contexts/ToastContext";

interface Props {
  data?: DirectoryTableRowData[];
  isErrored?: boolean;
  isLoading?: boolean;
}

export const DirectoryTable = ({
  data = [],
  isErrored = false,
  isLoading = false,
}: Props) => {
  const { displayToast } = useContext(ToastContext);

  return (
    <DirectoryTableProvider data={data}>
      <button
        className="bg-red-500"
        onClick={() => {
          displayToast({ variation: "success", title: "hello" });
        }}
      >
        hello
      </button>
      <DirectoryTableContent isLoading={isLoading} isErrored={isErrored} />
    </DirectoryTableProvider>
  );
};
