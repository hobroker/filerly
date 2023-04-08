import { type ReactNode } from "react";
import { CaretRight } from "@phosphor-icons/react";
import { BreadcrumbText } from "~/client/components/Breadcrumbs/components/BreadcrumbText";
import { BreadcrumbLink } from "~/client/components/Breadcrumbs/components/BreadcrumbLink";

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
