import { type ForwardRefExoticComponent, useState } from "react";
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
  variation = "primary",
  confirm,
  as: As = Item,
}: Props) => {
  const [internalTitle, setInternalTitle] = useState(title);
  const onSelect = (event: Event) => {
    if (!confirm || internalTitle === confirm) {
      onClick?.();

      return;
    }

    event.preventDefault();
    setInternalTitle(confirm);
  };

  return (
    <As
      key={title}
      onSelect={onSelect}
      className={classNames(
        "cursor-default rounded outline-0",
        "prose-sm flex w-full cursor-default items-center gap-2 rounded px-2 py-1 outline-none data-[highlighted]:text-white",
        {
          primary: "text-primary-500 data-[highlighted]:bg-primary-500",
          danger: "text-danger-500 data-[highlighted]:bg-danger-500",
        }[variation]
      )}
    >
      <Icon size={16} />
      {internalTitle}
    </As>
  );
};
