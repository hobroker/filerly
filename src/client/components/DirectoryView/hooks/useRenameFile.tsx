import { basename } from "path";
import { api, type RouterInputs } from "~/client/api";
import { useHandleError } from "~/client/components/DirectoryView/hooks/useHandleError";
import { useHandleFileActionsGroup } from "~/client/components/DirectoryView/hooks/useHandleFileActionsGroup";

interface Props {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useRenameFile = ({ onSuccess, onError }: Props) => {
  const _onSuccess = useHandleFileActionsGroup({
    successTitle: "Successfully renamed",
    errorTitle: "Failed to rename",
    onSuccess,
  });
  const _onError = useHandleError({ onError });
  const { mutate, data } = api.fs.rename.useMutation({
    onSuccess: _onSuccess,
    onError: _onError,
  });

  return {
    mutate: ({ path, newFilename }: RouterInputs["fs"]["rename"]) => {
      if (basename(path) === newFilename) return;
      mutate({
        path,
        newFilename: newFilename.trim(),
      });
    },
    data,
  };
};
