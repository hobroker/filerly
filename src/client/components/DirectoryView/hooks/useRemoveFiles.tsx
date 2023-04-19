import { api } from "~/client/api";
import { useHandleError } from "~/client/components/DirectoryView/hooks/useHandleError";
import { useHandleFileActionsGroup } from "~/client/components/DirectoryView/hooks/useHandleFileActionsGroup";

interface Props {
  onSuccess?: () => Promise<void>;
  onError?: () => void;
}

export const useRemoveFiles = ({ onSuccess, onError }: Props) => {
  const _onSuccess = useHandleFileActionsGroup({
    successTitle: "Successfully removed",
    errorTitle: "Failed to remove",
    onSuccess,
  });
  const _onError = useHandleError({ onError });
  const { mutate, data } = api.fs.remove.useMutation({
    onSuccess: _onSuccess,
    onError: _onError,
  });

  return {
    mutate,
    data,
  };
};
