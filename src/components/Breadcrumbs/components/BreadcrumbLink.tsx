import Link from "next/link";

interface Props {
  dirname: string;
  path: string[];
}

export const BreadcrumbLink = ({ dirname, path }: Props) => {
  return (
    <Link
      href={path.join("/")}
      className="text-sm font-medium text-gray-700 hover:text-blue-500"
    >
      {dirname}
    </Link>
  );
};
