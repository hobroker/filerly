import { api } from "~/client/api";

interface Props {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useRemoveFiles = ({ onSuccess, onError }: Props) => {
  const { mutate, data } = api.fs.remove.useMutation({
    onSuccess,
    onError,
  });

  return {
    mutate,
    data,
  };
};
