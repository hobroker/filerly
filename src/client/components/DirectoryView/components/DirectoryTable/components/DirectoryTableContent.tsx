import { type MouseEvent, useContext, useRef } from "react";
import { flexRender } from "@tanstack/react-table";
import { DIRECTORY_TABLE_COLUMNS as columns } from "~/client/components/DirectoryView/components/DirectoryTable/columns";
import { DirectoryTableContextMenu } from "~/client/components/DirectoryView/components/DirectoryTable/components/DirectoryTableContextMenu";
import { DirectoryTableRow } from "~/client/components/DirectoryView/components/DirectoryTable/components/DirectoryTableRow";
import { LoadingState } from "~/client/components/DirectoryView/components/DirectoryTable/components/LoadingState";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { type MetaType } from "~/client/components/DirectoryView/components/DirectoryTable/types";
import { useOnClickOutside } from "~/client/hooks/useOnClickOutside";
import { cx, findParentElement } from "~/client/utils";

interface Props {
  isErrored?: boolean;
  isLoading?: boolean;
}

export const DirectoryTableContent = ({
  isErrored = false,
  isLoading = false,
}: Props) => {
  const { table, setRowSelection, rowInEditMode } = useContext(
    DirectoryTableContext
  );
  const ref = useRef<HTMLTableElement>(null);
  useOnClickOutside<HTMLTableElement>(ref, () => setRowSelection({}));

  const onContextMenu = (event: MouseEvent<HTMLTableSectionElement>) => {
    const target = findParentElement<HTMLTableRowElement>(
      "tr",
      event.target as HTMLElement
    );
    if (!target) return;
    const { rowId } = target.dataset;
    if (!rowId) return;
    setRowSelection((prev) => (prev[rowId] ? prev : { [rowId]: true }));
  };

  return (
    <table ref={ref} className="prose-sm w-full whitespace-nowrap">
      <thead className="prose-sm border-b-2 text-left uppercase">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={cx(
                  "prose-sm h-8 p-0 first:rounded-bl-md last:rounded-br-md",
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
      <DirectoryTableContextMenu>
        <tbody className="text-base-700" onContextMenu={onContextMenu}>
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
      </DirectoryTableContextMenu>
    </table>
  );
};
