export type ToastVariation = "success" | "error" | "warning" | "info";

export interface ToastType {
  title: string;
  variation: ToastVariation;
}
