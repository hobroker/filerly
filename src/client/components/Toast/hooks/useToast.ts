import { useContext } from "react";
import { ToastContext } from "~/client/components/Toast/contexts";

export const useToast = () => useContext(ToastContext);
