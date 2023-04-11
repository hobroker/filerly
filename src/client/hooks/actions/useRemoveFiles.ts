import { useCallback } from "react";
import { api, type RouterInputs } from "~/client/api";

interface Props {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useRemoveFiles = ({ onSuccess, onError }: Props) => {
  const { mutate, data, error } = api.fs.remove.useMutation({
    onSuccess,
    onError,
  });

  console.log("data", data, error);

  return useCallback(
    (variables: RouterInputs["fs"]["remove"]) => mutate(variables),
    [mutate]
  );
};
