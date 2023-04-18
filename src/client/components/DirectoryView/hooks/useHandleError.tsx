import { useToast } from "~/client/components/Toast";

interface Props {
  onError?: () => void;
}

export const useHandleError = ({ onError }: Props) => {
  const { showToast } = useToast();

  return ({ message }: { message: string }) => {
    onError?.();

    showToast({
      title: "Error",
      variation: "danger",
      subtitle: message,
    });
  };
};
