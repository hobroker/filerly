import { type Icon } from "@phosphor-icons/react";

type ShortcutMenuItemVariation = "primary" | "danger";

export interface ShortcutMenuItem {
  title: string;
  icon: Icon;
  variation?: ShortcutMenuItemVariation;
  onClick?: () => void;
}
