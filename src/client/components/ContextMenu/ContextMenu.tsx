import { type PropsWithChildren } from "react";
import * as RadixContextMenu from "@radix-ui/react-context-menu";
import { DropdownMenuContent } from "~/client/components/DropdownMenu/components/DropdownMenuContent";
import {
  DropdownMenuItem,
  type DropdownMenuItemType,
} from "~/client/components/DropdownMenu/components/DropdownMenuItem";

interface Props {
  items?: DropdownMenuItemType[];
  onOpen?: () => void;
  onClose?: () => void;
}

export const ContextMenu = ({
  children,
  onOpen,
  onClose,
  items = [],
}: PropsWithChildren<Props>) => {
  if (!items?.length) return <>children</>;

  return (
    <RadixContextMenu.Root
      onOpenChange={(open: boolean) => (open ? onOpen?.() : onClose?.())}
    >
      <RadixContextMenu.Trigger asChild>{children}</RadixContextMenu.Trigger>
      <RadixContextMenu.Portal>
        <DropdownMenuContent as={RadixContextMenu.Content}>
          {items.map((item) => (
            <DropdownMenuItem
              key={item.title}
              as={RadixContextMenu.Item}
              {...item}
            />
          ))}
        </DropdownMenuContent>
      </RadixContextMenu.Portal>
    </RadixContextMenu.Root>
  );
};
