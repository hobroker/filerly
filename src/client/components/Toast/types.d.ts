export type ToastVariation = "success" | "error" | "warning" | "info";

export interface ToastType {
  title: string;
  subtitle?: string;
  variation?: ToastVariation;
}
