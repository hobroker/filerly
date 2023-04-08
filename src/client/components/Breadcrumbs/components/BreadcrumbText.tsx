import { type ReactNode } from "react";

interface Props {
  title: ReactNode;
}

export const BreadcrumbText = ({ title }: Props) => {
  return <span className="text-sm text-gray-600 font-bold">{title}</span>;
};
