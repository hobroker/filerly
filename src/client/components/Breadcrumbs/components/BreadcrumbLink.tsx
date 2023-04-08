import { type ReactNode } from "react";
import Link from "next/link";

interface Props {
  title: ReactNode;
  path: string[];
}

export const BreadcrumbLink = ({ title, path }: Props) => {
  return (
    <Link
      href={path.join("/")}
      className="text-sm hover:underline"
    >
      {title}
    </Link>
  );
};
