import {
  type Icon,
  Folder,
  File,
  FileJs,
  FileTs,
  FileJsx,
  FileTsx,
} from "@phosphor-icons/react";

interface Props {
  isDirectory: boolean;
  filename: string;
}

const EXTENSION_ICONS: Record<string, Icon> = {
  js: FileJs,
  mjs: FileJs,
  cjs: FileJs,
  jsx: FileJsx,
  ts: FileTs,
  tsx: FileTsx,
};

export const FileIcon = ({ isDirectory, filename }: Props) => {
  if (isDirectory) {
    return <Folder weight="fill" size={16} />;
  }
  const extension = filename.match(/\.[0-9a-z]+$/i)?.[0]?.replace(".", "");
  const Icon = (extension && EXTENSION_ICONS[extension]) || File;

  return <Icon size={16} />;
};
