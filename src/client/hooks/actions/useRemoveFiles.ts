import { useCallback } from "react";
import { api } from "~/client/utils";
import { type RouterInputs } from "~/client/utils/api";

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
