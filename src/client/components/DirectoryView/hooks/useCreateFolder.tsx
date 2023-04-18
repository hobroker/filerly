import { api } from "~/client/api";
import { useHandleFileActionsGroup } from "~/client/components/DirectoryView/hooks/useHandleFileActionsGroup";

interface Props {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useCreateFolder = ({ onSuccess, onError }: Props) => {
  const _onSuccess = useHandleFileActionsGroup({
    successTitle: "Directory created",
    errorTitle: "Failed to create a directory",
    onSuccess,
  });
  const { mutate, data } = api.fs.mkdir.useMutation({
    onSuccess: _onSuccess,
    onError,
  });

  return {
    mutate,
    data,
  };
};
