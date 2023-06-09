import { House } from "@phosphor-icons/react";
import { BreadcrumbItem } from "~/client/components/DirectoryView/components/Breadcrumbs/components/BreadcrumbItem";

interface Props {
  path: string[];
}

export const Breadcrumbs = ({ path }: Props) => (
  <nav className="flex h-8 rounded-t-md bg-base-200 px-2">
    <ol className="flex items-center gap-1">
      <BreadcrumbItem path={["/"]} title={<House weight="fill" size={16} />} />
      {path?.map((dirname, index) => (
        <BreadcrumbItem
          key={`${dirname}${index}`}
          path={path.slice(0, index + 1)}
          title={dirname}
          isLast={index === path.length - 1}
        />
      ))}
    </ol>
  </nav>
);
