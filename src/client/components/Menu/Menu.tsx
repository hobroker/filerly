import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { type TableAction } from "~/client/components/Menu/types";

interface Props {
  items: TableAction[];
}

export const Menu = ({ items }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button>
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-32 rounded bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5"
          align="end"
          sideOffset={5}
        >
          {items.map(({ title, icon: Icon, onClick, variation }) => (
            <DropdownMenu.Item
              key={title}
              onClick={onClick}
              className={classNames(
                "prose-sm relative flex w-full cursor-default items-center gap-2 rounded px-2 py-1 outline-none",
                {
                  primary:
                    "text-primary-900 focus:bg-primary-400 focus:text-white",
                  danger:
                    "text-danger-900 focus:bg-danger-400 focus:text-white",
                }[variation || "primary"]
              )}
            >
              <Icon size={16} />
              {title}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
