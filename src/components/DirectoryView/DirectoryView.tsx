import { DirectoryTable } from "~/components/DirectoryTable";
import { api } from "~/utils/api";

interface Props {
  path?: string[];
}

export const DirectoryView = ({ path = [] }: Props) => {
  const { data } = api.fs.ls.useQuery({ path: path });

  return (
    <div>
      <b>path: {path}</b>
      <DirectoryTable data={data || []} />
    </div>
  );
};
