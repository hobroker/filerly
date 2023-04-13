export type ToastVariation = "success" | "error" | "warning" | "info";

export interface ToastType {
  title: string;
  subtitle?: string;
  variation?: ToastVariation;
}

export interface ToastTypeWithId extends ToastType {
  id: string;
}
