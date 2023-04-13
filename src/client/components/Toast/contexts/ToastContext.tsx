import { createContext, type ReactNode, useCallback, useState } from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { compose, equals, prop, reject } from "ramda";
import { noop } from "ramda-adjunct";
import { Toast } from "~/client/components/Toast/components/Toast";
import {
  type ToastType,
  type ToastTypeWithId,
} from "~/client/components/Toast/types";
import { uuid } from "~/client/utils/uuid";

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
  const [toasts, setToasts] = useState<ToastTypeWithId[]>([]);
  const showToast = useCallback((toast: ToastType) => {
    setToasts((prev) => [...prev, { ...toast, id: uuid() }]);
  }, []);

  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
      <RadixToast.Provider swipeDirection="right" duration={3000}>
        {children}

        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onOpenChange={() =>
              setToasts(reject(compose(equals(toast.id), prop("id"))))
            }
          />
        ))}
        <RadixToast.Viewport className="fixed bottom-0 right-0 z-50 m-0 flex max-h-full w-80 max-w-full flex-col gap-2 overflow-hidden overflow-y-auto p-2" />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}

export { ToastProvider, ToastContext };
