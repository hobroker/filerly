import { api } from "~/client/api";
import { Breadcrumbs } from "~/client/components/DirectoryView/components/Breadcrumbs";
import { DirectoryTable } from "~/client/components/DirectoryView/components/DirectoryTable";
import { DirectoryProvider } from "~/client/components/DirectoryView/contexts";
import { ToastProvider } from "~/client/components/Toast/contexts";

interface Props {
  path: string[];
}

export const DirectoryView = ({ path }: Props) => {
  const { data, error, isLoading, refetch } = api.fs.ls.useQuery({ path });

  return (
    <ToastProvider>
      <DirectoryProvider path={path} refetch={() => void refetch()}>
        <div className="flex h-full flex-col p-1">
          <Breadcrumbs path={path} />
          <div className="block h-full overflow-y-scroll">
            <DirectoryTable
              data={data}
              isErrored={!!error}
              isLoading={isLoading}
            />
          </div>
        </div>
      </DirectoryProvider>
    </ToastProvider>
  );
};
