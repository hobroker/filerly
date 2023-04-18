import { useContext } from "react";
import { flexRender } from "@tanstack/react-table";
import { DirectoryTableContext } from "~/client/components/DirectoryView/components/DirectoryTable/contexts";
import { type MetaType } from "~/client/components/DirectoryView/components/DirectoryTable/types";
import { cx } from "~/client/utils";

export const DirectoryTableHead = () => {
  const { table } = useContext(DirectoryTableContext);

  return (
    <thead className="prose-sm sticky top-0 bg-white text-left uppercase shadow-sm">
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
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};
