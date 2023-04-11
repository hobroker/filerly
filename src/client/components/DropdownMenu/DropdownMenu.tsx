import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { type TableAction } from "~/client/components/DropdownMenu/types";

interface Props {
  items: TableAction[];
}

export const DropdownMenu = ({ items }: Props) => {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger asChild>
        <button>
          <HamburgerMenuIcon />
        </button>
      </RadixDropdownMenu.Trigger>

      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          className="w-32 rounded bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5"
          align="end"
          sideOffset={5}
        >
          {items.map(({ title, icon: Icon, onClick, variation }) => (
            <RadixDropdownMenu.Item
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
            </RadixDropdownMenu.Item>
          ))}
          <RadixDropdownMenu.Arrow className="fill-white" />
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
};
