import { type ReactNode } from "react";

export type ToastVariation = "success" | "danger" | "warning" | "info";

export interface ToastType {
  title: string;
  subtitle?: ReactNode;
  variation?: ToastVariation;
}

export interface ToastTypeWithId extends ToastType {
  id: string;
}
