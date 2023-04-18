import { type MouseEvent, useContext } from "react";
import { DirectoryTableContextMenu } from "~/client/components/DirectoryView/components/DirectoryTable/components/DirectoryTableContextMenu";
import { DirectoryTableRow } from "~/client/components/DirectoryView/components/DirectoryTable/components/DirectoryTableRow/DirectoryTableRow";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { findParentElement } from "~/client/utils";

export const DirectoryTableBody = () => {
  const { table, setRowSelection } = useContext(DirectoryTableContext);

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
    <DirectoryTableContextMenu>
      <tbody onContextMenu={onContextMenu}>
        {table.getRowModel().rows.map((row, index) => (
          <DirectoryTableRow isEven={index % 2 === 0} key={row.id} row={row} />
        ))}
      </tbody>
    </DirectoryTableContextMenu>
  );
};
