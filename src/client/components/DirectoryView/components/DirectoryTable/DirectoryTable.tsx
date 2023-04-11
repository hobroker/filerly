import { DirectoryTableContent } from "~/client/components/DirectoryView/components/DirectoryTable/components/DirectoryTableContent";
import { DirectoryTableProvider } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { type DirectoryTableRowData } from "~/client/components/DirectoryView/components/DirectoryTable/types";

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
  return (
    <DirectoryTableProvider data={data}>
      <DirectoryTableContent isLoading={isLoading} isErrored={isErrored} />
    </DirectoryTableProvider>
  );
};
