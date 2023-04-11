import { api } from "~/client/api";
import { Breadcrumbs } from "~/client/components/Breadcrumbs";
import { DirectoryTable } from "~/client/components/DirectoryView/components/DirectoryTable";
import { DirectoryProvider } from "~/client/components/DirectoryView/contexts";
<<<<<<< HEAD
import { ToastProvider } from "~/client/components/Toast/contexts";
import { api } from "~/client/utils";
||||||| parent of b4e0226 (remove dir)
import { api } from "~/client/utils";
=======
>>>>>>> b4e0226 (remove dir)

interface Props {
  path: string[];
}

export const DirectoryView = ({ path }: Props) => {
  const { data, error, isLoading, refetch } = api.fs.ls.useQuery({ path });

  return (
    <ToastProvider>
      <DirectoryProvider path={path} refetch={refetch}>
        <div className="p-2">
          <Breadcrumbs path={path} />
          <DirectoryTable
            data={data}
            isErrored={!!error}
            isLoading={isLoading}
          />
        </div>
      </DirectoryProvider>
    </ToastProvider>
  );
};
