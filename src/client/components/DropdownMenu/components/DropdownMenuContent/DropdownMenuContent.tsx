import { forwardRef, type ForwardRefExoticComponent } from "react";
import { type MenuContentProps, Content } from "@radix-ui/react-menu";
import classNames from "classnames";

interface Props extends MenuContentProps {
  as?: ForwardRefExoticComponent<MenuContentProps>;
}

export const DropdownMenuContent = forwardRef(
  ({ className, as: As = Content, ...rest }: Props, ref) => (
    <As
      className={classNames(
        "w-32 select-none rounded bg-base-100 p-1 shadow-lg ring-1 ring-base-900 ring-opacity-5",
        className
      )}
      {...{ ...rest, ref }}
    />
  )
);

DropdownMenuContent.displayName = "DropdownMenuContent";
