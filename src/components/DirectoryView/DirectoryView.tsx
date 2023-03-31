import { useContext } from "react";
import { DirectoryTable } from "~/components/DirectoryTable";
import { api } from "~/utils/api";
import { DirectoryContext } from "~/contexts/DirectoryContext";
import { Breadcrumbs } from "~/components/Breadcrumbs/Breadcrumbs";

export const DirectoryView = () => {
  const { path } = useContext(DirectoryContext);
  const { data } = api.fs.ls.useQuery({ path });

  return (
    <div className="p-2">
      <Breadcrumbs />
      <DirectoryTable data={data || []} />
    </div>
  );
};
