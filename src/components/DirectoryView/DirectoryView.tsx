import { DirectoryTable } from "~/components/DirectoryTable";
import { api } from "~/utils/api";
import { DirectoryProvider } from "~/contexts/DirectoryContext";
import { Breadcrumbs } from "~/components/Breadcrumbs/Breadcrumbs";

interface Props {
  path: string[];
}

export const DirectoryView = ({ path }: Props) => {
  const { data, error, isLoading } = api.fs.ls.useQuery({ path });

  return (
    <DirectoryProvider path={path}>
      <div className="p-2">
        <Breadcrumbs />
        <DirectoryTable data={data} isErrored={!!error} isLoading={isLoading} />
      </div>
    </DirectoryProvider>
  );
};
