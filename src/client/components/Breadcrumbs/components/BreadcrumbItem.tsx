import { CaretRight } from "@phosphor-icons/react";
import { type ReactNode } from "react";
import { BreadcrumbLink } from "~/client/components/Breadcrumbs/components/BreadcrumbLink";
import { BreadcrumbText } from "~/client/components/Breadcrumbs/components/BreadcrumbText";

interface Props {
  title: ReactNode;
  path: string[];
  isLast?: boolean;
}

export const BreadcrumbItem = ({ title, isLast = false, path }: Props) => (
  <li className="flex items-center">
    {isLast ? (
      <BreadcrumbText title={title} />
    ) : (
      <>
        <BreadcrumbLink path={path} title={title} />
        <CaretRight size={16} className="ml-1" />
      </>
    )}
  </li>
);
