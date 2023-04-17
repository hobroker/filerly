import { last } from "ramda";
import { useToast } from "~/client/components/Toast";
import { cx } from "~/client/utils";
import {
  type FileActionResult,
  type FileActionResultError,
  type FileActionsGroup,
} from "~/common/types";

interface Props {
  successTitle: string;
  errorTitle: string;
  onSuccess?: () => void;
}

const isError = (item: FileActionResult): item is FileActionResultError =>
  "error" in item;

const ToastSubtitle = ({ list }: { list: FileActionResult[] }) => (
  <div className="not-prose">
    <ol
      className={cx({
        "list-decimal": list.length > 1,
      })}
    >
      {list.map((item) => (
        <li key={item.path} className="prose-xs">
          <span>{last(item.path.split("/"))}</span>
          {isError(item) && (
            <span className="font-semibold">{item.error.message}</span>
          )}
        </li>
      ))}
    </ol>
  </div>
);

export const useHandleFileActionsGroup = ({
  successTitle,
  errorTitle,
  onSuccess,
}: Props) => {
  const { showToast } = useToast();

  return ({ sucessful, errored }: FileActionsGroup) => {
    onSuccess?.();

    if (sucessful.length) {
      showToast({
        title: successTitle,
        variation: "success",
        subtitle: <ToastSubtitle list={sucessful} />,
      });
    }

    if (errored.length) {
      showToast({
        title: errorTitle,
        variation: "danger",
        subtitle: <ToastSubtitle list={errored} />,
      });
    }
  };
};
