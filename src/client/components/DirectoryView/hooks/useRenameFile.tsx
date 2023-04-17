import { basename } from "path";
import { last } from "ramda";
import { api, type RouterInputs } from "~/client/api";
import { useToast } from "~/client/components/Toast";

interface Props {
  onSuccess?: () => void;
  onError?: () => void;
}

export const useRenameFile = ({ onSuccess, onError }: Props) => {
  const { showToast } = useToast();
  const { mutate, data } = api.fs.rename.useMutation({
    onSuccess: ({ sucessful, errored }) => {
      onSuccess?.();
      if (sucessful.length) {
        showToast({
          title: "Successfully renamed:",
          variation: "success",
          subtitle: (
            <ol className="list-decimal">
              {sucessful.map(({ path }) => (
                <li key={path}>{last(path.split("/"))}</li>
              ))}
            </ol>
          ),
        });
      }
      if (errored.length) {
        showToast({
          title: "Failed to rename:",
          variation: "danger",
          subtitle: (
            <ol className="list-decimal">
              {errored.map(({ path, error }) => (
                <li key={path}>
                  <span className="flex flex-col">
                    <span>{last(path.split("/"))}</span>
                    <span className="font-semibold">{error.message}</span>
                  </span>
                </li>
              ))}
            </ol>
          ),
        });
      }
    },
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
