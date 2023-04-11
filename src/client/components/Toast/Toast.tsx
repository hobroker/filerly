import { CheckCircle, X } from "@phosphor-icons/react";
import { type ToastType } from "~/client/components/Toast/types";

interface Props extends ToastType {
  close: () => void;
}

export const Toast = ({ title, close }: Props) => {
  return (
    <div>
      <div
        className="flex w-full max-w-xs items-center gap-2 rounded bg-success-50 p-2 shadow-lg ring-1 ring-success-900 ring-opacity-5"
        role="alert"
      >
        <div className="inline-flex h-6 w-6 items-center justify-center rounded-lg text-success-500">
          <CheckCircle size={24} />
        </div>
        <div className="prose-sm">{title}</div>
        <button
          type="button"
          className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-lg text-success-500 hover:bg-success-100 hover:text-success-600"
          aria-label="Close"
          onClick={close}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
