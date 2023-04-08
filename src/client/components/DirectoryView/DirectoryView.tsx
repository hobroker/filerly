import { DirectoryTable } from "~/client/components/DirectoryTable";
import { api } from "~/utils/api";
import { DirectoryProvider } from "~/client/contexts/DirectoryContext";
import { Breadcrumbs } from "~/client/components/Breadcrumbs/Breadcrumbs";

interface Props {
  path: string[];
}

export const DirectoryView = ({ path }: Props) => {
  const { data, error, isLoading } = api.fs.ls.useQuery({ path });

  return (
    <DirectoryProvider path={path}>
      <div className="p-2">
        <Breadcrumbs path={path} />
        <DirectoryTable data={data} isErrored={!!error} isLoading={isLoading} />
      </div>
    </DirectoryProvider>
  );
};