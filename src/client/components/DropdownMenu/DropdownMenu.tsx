import { List } from "@phosphor-icons/react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent } from "~/client/components/DropdownMenu/components/DropdownMenuContent";
import {
  DropdownMenuItem,
  type DropdownMenuItemType,
} from "~/client/components/DropdownMenu/components/DropdownMenuItem";

interface Props {
  items: DropdownMenuItemType[];
}

export const DropdownMenu = ({ items }: Props) => {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger asChild>
        <button>
          <List />
        </button>
      </RadixDropdownMenu.Trigger>

      <RadixDropdownMenu.Portal>
        <DropdownMenuContent as={RadixDropdownMenu.Content}>
          {items.map((item) => (
            <DropdownMenuItem
              key={item.title}
              as={RadixDropdownMenu.Item}
              {...item}
            />
          ))}
          <RadixDropdownMenu.Arrow className="fill-white" />
        </DropdownMenuContent>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
};
