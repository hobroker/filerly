import {
  type ForwardRefExoticComponent,
  type MouseEvent,
  useState,
} from "react";
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
  confirm,
  as: As = Item,
}: Props) => {
  const [internalTitle, setInternalTitle] = useState(title);
  const onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (internalTitle !== confirm) {
      event.stopPropagation();

      if (!confirm) return;
      setInternalTitle(confirm);

      return;
    }
  };

  return (
    <As
      key={title}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
    >
      <button
        className={classNames(
          "prose-sm flex w-full cursor-default items-center gap-2 rounded px-2 py-1 outline-none",
          "hover:text-white",
          {
            primary:
              "text-primary-600 hover:bg-primary-500 hover:text-white focus:bg-primary-500 focus:text-white",
            danger:
              "text-danger-600 hover:bg-danger-500 hover:text-white focus:bg-danger-500 focus:text-white",
          }[variation || "primary"]
        )}
        onClick={onButtonClick}
      >
        <Icon size={16} />
        {internalTitle}
      </button>
    </As>
  );
};
