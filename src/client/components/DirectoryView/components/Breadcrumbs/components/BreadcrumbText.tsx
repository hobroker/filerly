import { type ReactNode } from "react";

interface Props {
  title: ReactNode;
}

export const BreadcrumbText = ({ title }: Props) => {
  return <span className="prose-sm font-bold">{title}</span>;
};
