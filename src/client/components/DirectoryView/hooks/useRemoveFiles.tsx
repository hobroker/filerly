import { api } from "~/client/api";
import { useHandleFileActionsGroup } from "~/client/components/DirectoryView/hooks/useHandleFileActionsGroup";

interface Props {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useRemoveFiles = ({ onSuccess, onError }: Props) => {
  const _onSuccess = useHandleFileActionsGroup({
    successTitle: "Successfully removed",
    errorTitle: "Failed to remove",
    onSuccess,
  });
  const { mutate, data } = api.fs.remove.useMutation({
    onSuccess: _onSuccess,
    onError,
  });

  return {
    mutate,
    data,
  };
};
