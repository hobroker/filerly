import { X } from "@phosphor-icons/react";
import * as RadixToast from "@radix-ui/react-toast";
import { type ToastProps } from "@radix-ui/react-toast";
import { type ToastType } from "~/client/components/Toast/types";
import { cx } from "~/client/utils";

type Props = ToastProps & ToastType;

export const Toast = ({
  title,
  subtitle,
  variation = "info",
  ...rest
}: Props) => {
  return (
    <RadixToast.Root
      className={cx(
        "flex flex-col items-start gap-x-2 rounded bg-white bg-opacity-95 p-1 text-white shadow-lg ring-1 ring-base-900 ring-opacity-5",
        "data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]",
        {
          error: "bg-danger-400",
          success: "bg-success-400",
          warning: "bg-warning-400",
          info: "bg-base-400",
        }[variation]
      )}
      {...rest}
    >
      <div className="flex w-full">
        <RadixToast.Title asChild className="prose-sm font-semibold">
          <p>{title}</p>
        </RadixToast.Title>
        <RadixToast.Action asChild altText="Close">
          <button
            type="button"
            className="ml-auto inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg text-white transition-all hover:bg-base-50 hover:bg-opacity-25"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </RadixToast.Action>
      </div>
      <RadixToast.Description asChild className="prose-xs">
        <p>{subtitle}</p>
      </RadixToast.Description>
    </RadixToast.Root>
  );
};
