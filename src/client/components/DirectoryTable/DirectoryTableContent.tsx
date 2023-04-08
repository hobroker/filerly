import { useContext } from "react";
import { flexRender } from "@tanstack/react-table";
import classNames from "classnames";
import { LoadingState } from "~/client/components/DirectoryTable/components/LoadingState";
import { DIRECTORY_TABLE_COLUMNS as columns } from "~/client/components/DirectoryTable/constants";
import { DirectoryTableContext } from "~/client/components/DirectoryTable/contexts/DirectoryContext";
import { DirectoryTableRow } from "~/client/components/DirectoryTable/DirectoryTableRow";
import { type MetaType } from "~/client/components/DirectoryTable/types";
import { useOnClickOutside } from "~/client/hooks/useOnClickOutside";

interface Props {
  isErrored?: boolean;
  isLoading?: boolean;
}

export const DirectoryTableContent = ({
  isErrored = false,
  isLoading = false,
}: Props) => {
  const { table, setRowSelection } = useContext(DirectoryTableContext);
  const { ref } = useOnClickOutside<HTMLTableElement>(() =>
    setRowSelection({})
  );

  return (
    <table
      ref={ref}
      className="w-full whitespace-nowrap text-left text-sm"
      tabIndex={0}
    >
      <thead className="border-b-2 text-sm uppercase">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={classNames(
                  "h-8 p-0 first:rounded-bl-md last:rounded-br-md",
                  (header.column.columnDef.meta as MetaType)?.className
                )}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {isLoading || isErrored ? (
          <tr>
            <td className="h-6 p-0" colSpan={columns.length}>
              <LoadingState />
            </td>
          </tr>
        ) : (
          table
            .getRowModel()
            .rows.map((row) => <DirectoryTableRow key={row.id} row={row} />)
        )}
      </tbody>
    </table>
  );
};
