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
        "flex items-center gap-x-4 rounded bg-white bg-opacity-95 p-1 text-white shadow-xl ring-1 ring-base-900 ring-opacity-5",
        {
          error: "bg-danger-400",
          success: "bg-success-400",
          warning: "bg-warning-400",
          info: "bg-base-400",
        }[variation]
      )}
      {...rest}
    >
      <div>
        <RadixToast.Title asChild className="prose-sm">
          <p>{title}</p>
        </RadixToast.Title>
        <RadixToast.Description asChild className="prose-xs">
          <p>{subtitle}</p>
        </RadixToast.Description>
      </div>
      <RadixToast.Action asChild altText="Close">
        <button
          type="button"
          className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-lg text-white transition-all hover:bg-base-50 hover:bg-opacity-25"
          aria-label="Close"
        >
          <X size={12} />
        </button>
      </RadixToast.Action>
    </RadixToast.Root>
  );
};
