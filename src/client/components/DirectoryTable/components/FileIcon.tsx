import { Folder } from "@phosphor-icons/react";
import { getIcon } from "material-file-icons";

interface Props {
  isDirectory: boolean;
  filename: string;
}

export const FileIcon = ({ isDirectory, filename }: Props) => {
  if (isDirectory) {
    return <Folder weight="fill" size={16} />;
  }
  const { svg } = getIcon(filename);

  return <div className="w-4" dangerouslySetInnerHTML={{ __html: svg }} />;
};
