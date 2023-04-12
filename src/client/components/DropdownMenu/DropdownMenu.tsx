import { List } from "@phosphor-icons/react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent } from "~/client/components/DropdownMenu/components/DropdownMenuContent";
import {
  DropdownMenuItem,
  type DropdownMenuItemType,
} from "~/client/components/DropdownMenu/components/DropdownMenuItem";

interface Props {
  items: DropdownMenuItemType[];
  onOpen?: () => void;
  onClose?: () => void;
}

export const DropdownMenu = ({ items, onOpen, onClose }: Props) => {
  return (
    <RadixDropdownMenu.Root
      onOpenChange={(open: boolean) => (open ? onOpen?.() : onClose?.())}
    >
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
          <RadixDropdownMenu.Arrow className="fill-base-100" />
        </DropdownMenuContent>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
};
