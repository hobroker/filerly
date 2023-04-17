import { basename } from "path";
import { api, type RouterInputs } from "~/client/api";
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
  const { mutate, data } = api.fs.rename.useMutation({
    onSuccess: _onSuccess,
    onError,
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
