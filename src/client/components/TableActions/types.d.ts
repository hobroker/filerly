import { type Icon } from "@phosphor-icons/react";

type TableActionVariation = "basic" | "danger";

export interface TableAction {
  title: string;
  icon: Icon;
  onClick?: () => void;
  variation?: TableActionVariation;
}
