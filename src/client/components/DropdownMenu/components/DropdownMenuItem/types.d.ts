import { type Icon } from "@phosphor-icons/react";

type DropdownMenuItemVariation = "primary" | "danger";

export interface DropdownMenuItemType {
  title: string;
  icon: Icon;
  onClick?: () => void;
  variation?: DropdownMenuItemVariation;
  confirm?: string;
}
