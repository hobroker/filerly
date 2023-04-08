import Link from "next/link";
import { type ReactNode } from "react";

interface Props {
  title: ReactNode;
  path: string[];
}

export const BreadcrumbLink = ({ title, path }: Props) => {
  return (
    <Link href={path.join("/")} className="text-sm hover:underline">
      {title}
    </Link>
  );
};
