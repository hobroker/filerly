import { FileIcon } from "~/client/components/DirectoryTable/components/FileIcon";

interface Props {
  filename: string;
  isDirectory: boolean;
}

export const FileName = ({ filename, isDirectory }: Props) => (
  <span className="flex items-center gap-1">
    <FileIcon filename={filename} isDirectory={isDirectory} />
    {filename}
  </span>
);
