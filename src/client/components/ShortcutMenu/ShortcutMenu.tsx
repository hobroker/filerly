import { type PropsWithChildren } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { type ShortcutMenuItem } from "~/client/components/ShortcutMenu/types";
import { cx } from "~/client/utils/cx";

interface Props {
  items?: ShortcutMenuItem[];
  onOpen?: () => void;
  onClose?: () => void;
}

export const ShortcutMenu = ({
  children,
  onOpen,
  onClose,
  items = [],
}: PropsWithChildren<Props>) => {
  if (!items?.length) return <>children</>;

  return (
    <ContextMenu.Root
      onOpenChange={(open: boolean) => (open ? onOpen?.() : onClose?.())}
    >
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="w-32 rounded bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5">
          {items.map(({ title, icon: Icon, variation, onClick }) => (
            <ContextMenu.Item
              key={title}
              onClick={onClick}
              className={cx(
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
            </ContextMenu.Item>
          ))}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};
