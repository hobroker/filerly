import { type ForwardRefExoticComponent } from "react";
import { type MenuItemProps, Item } from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";
import { type DropdownMenuItemType } from "~/client/components/DropdownMenu/components/DropdownMenuItem/types";

interface Props
  extends DropdownMenuItemType,
    Omit<MenuItemProps, "title" | "onClick"> {
  as?: ForwardRefExoticComponent<MenuItemProps>;
}

export const DropdownMenuItem = ({
  title,
  icon: Icon,
  onClick,
  variation,
  as: As = Item,
}: Props) => {
  return (
    <As
      key={title}
      onClick={onClick}
      className={classNames(
        "prose-sm flex w-full cursor-default items-center gap-2 rounded px-2 py-1 outline-none",
        {
          primary: "text-primary-900 focus:bg-primary-400 focus:text-white",
          danger: "text-danger-900 focus:bg-danger-400 focus:text-white",
        }[variation || "primary"]
      )}
    >
      <Icon size={16} />
      {title}
    </As>
  );
};
