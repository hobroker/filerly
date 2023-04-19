import { api, type RouterInputs, type RouterOutputs } from "~/client/api";

interface Props {
  onSuccess?: (
    data: RouterOutputs["fs"]["mkdir"],
    variables: RouterInputs["fs"]["mkdir"]
  ) => Promise<void>;
  onError?: () => void;
}

export const useCreateFolder = ({ onSuccess, onError }: Props) => {
  const { mutate, data } = api.fs.mkdir.useMutation({
    onSuccess,
    onError,
  });

  return {
    mutate,
    data,
  };
};
