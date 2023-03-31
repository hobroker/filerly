import Link from "next/link";
import { useContext } from "react";
import { DirectoryContext } from "~/contexts/DirectoryContext";
import { FileIcon } from "~/components/DirectoryTable/components/FileIcon";

interface Props {
  filename: string;
  isDirectory: boolean;
}

export const FileName = ({ filename, isDirectory }: Props) => {
  const { path } = useContext(DirectoryContext);
  const content = (
    <span className="flex gap-2">
      <FileIcon filename={filename} isDirectory={isDirectory} />
      {filename}
    </span>
  );
  if (isDirectory) {
    return <Link href={[...path, filename].join("/")}>{content}</Link>;
  }
  return content;
};
