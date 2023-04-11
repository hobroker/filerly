import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { noop } from "ramda-adjunct";
import { Toast } from "~/client/components/Toast/Toast";
import { type ToastType } from "~/client/components/Toast/types";

interface Props {
  children: ReactNode;
}

interface ContextType {
  displayToast: (toast: ToastType) => void;
  clearToast: () => void;
}

const ToastContext = createContext<ContextType>({
  displayToast: noop,
  clearToast: noop,
});

function ToastProvider({ children }: Props) {
  const [toast, setToast] = useState<ToastType>();
  const clearToast = useCallback(() => setToast(undefined), []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(setToast, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <ToastContext.Provider
      value={{
        displayToast: setToast,
        clearToast,
      }}
    >
      {children}
      {toast && <Toast close={clearToast} {...toast} />}
    </ToastContext.Provider>
  );
}

export { ToastProvider, ToastContext };
