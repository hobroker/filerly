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
        "w-32 rounded bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5",
        className
      )}
      align="end"
      {...{ ...rest, ref }}
    />
  )
);

DropdownMenuContent.displayName = "DropdownMenuContent";
