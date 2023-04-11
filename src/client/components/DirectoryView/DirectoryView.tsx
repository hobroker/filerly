import { Breadcrumbs } from "~/client/components/Breadcrumbs/Breadcrumbs";
import { DirectoryTable } from "~/client/components/DirectoryView/components/DirectoryTable";
import { DirectoryProvider } from "~/client/components/DirectoryView/contexts/DirectoryContext";
import { api } from "~/client/utils/api";

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
