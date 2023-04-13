import { createContext, type ReactNode, useState } from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { reject } from "ramda";
import { noop } from "ramda-adjunct";
import { Toast } from "~/client/components/Toast/components/Toast";
import { type ToastType } from "~/client/components/Toast/types";

interface Props {
  children: ReactNode;
}

interface ContextType {
  showToast: (toast: ToastType) => void;
}

const ToastContext = createContext<ContextType>({
  showToast: noop,
});

function ToastProvider({ children }: Props) {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const showToast = (toast: ToastType) => {
    setToasts((toasts) => [...toasts, toast]);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
      <RadixToast.Provider swipeDirection="right" duration={40000}>
        {children}

        {toasts.map((toast) => (
          <Toast
            key={toast.title}
            {...toast}
            onOpenChange={() =>
              setToasts(reject((t: ToastType) => t.title === toast.title))
            }
          />
        ))}
        <RadixToast.Viewport className="fixed bottom-0 right-0 z-50 m-0 flex w-80 max-w-full flex-col gap-2 p-2" />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}

export { ToastProvider, ToastContext };
