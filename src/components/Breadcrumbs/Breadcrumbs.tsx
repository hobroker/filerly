import { useContext } from "react";
import { DirectoryContext } from "~/contexts/DirectoryContext";
import { CaretRight } from "@phosphor-icons/react";
import { BreadcrumbText } from "~/components/Breadcrumbs/components/BreadcrumbText";
import { BreadcrumbLink } from "~/components/Breadcrumbs/components/BreadcrumbLink";

export const Breadcrumbs = () => {
  const { path } = useContext(DirectoryContext);

  return (
    <nav className="flex rounded-t-md bg-gray-200 p-2">
      <ol className="flex items-center gap-1">
        {path?.map((dir, index) => (
          <li key={`${dir}${index}`}>
            <div className="flex items-center">
              {index ? <CaretRight size={16} className="mr-1" /> : null}
              {index === path.length - 1 ? (
                <BreadcrumbText dirname={dir} />
              ) : (
                <BreadcrumbLink path={path.slice(0, index + 1)} dirname={dir} />
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
