import { type ReactNode } from "react";

interface Props {
  title: ReactNode;
}

export const BreadcrumbText = ({ title }: Props) => {
  return <span className="text-sm font-bold">{title}</span>;
};
