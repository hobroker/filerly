import { useContext, useRef } from "react";
import { DIRECTORY_TABLE_COLUMNS as columns } from "~/client/components/DirectoryView/components/DirectoryTable/columns";
import { DirectoryTableBody } from "~/client/components/DirectoryView/components/DirectoryTable/components/DirectoryTableBody";
import { DirectoryTableHead } from "~/client/components/DirectoryView/components/DirectoryTable/components/DirectoryTableHead";
import { LoadingState } from "~/client/components/DirectoryView/components/DirectoryTable/components/LoadingState";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { useOnClickOutside } from "~/client/hooks";

interface Props {
  isErrored?: boolean;
  isLoading?: boolean;
}

export const DirectoryTableContent = ({
  isErrored = false,
  isLoading = false,
}: Props) => {
  const { setRowSelection } = useContext(DirectoryTableContext);
  const ref = useRef<HTMLTableElement>(null);
  useOnClickOutside<HTMLTableElement>(ref, () => setRowSelection({}));

  return (
    <table
      ref={ref}
      className="prose-sm relative h-full w-full whitespace-nowrap"
    >
      <DirectoryTableHead />
      {isLoading || isErrored ? (
        <tbody>
          <tr>
            <td className="h-6 p-0" colSpan={columns.length}>
              <LoadingState />
            </td>
          </tr>
        </tbody>
      ) : (
        <DirectoryTableBody />
      )}
    </table>
  );
};
