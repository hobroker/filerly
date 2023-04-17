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

const ToastSubtitle = ({ list }: { list: FileActionResult[] }) => {
  const isOne = list.length === 1;

  return (
    <div className={cx({ "not-prose": isOne })}>
      <ol className="list-decimal">
        {list.map((item) => (
          <li key={item.path} className="prose-xs">
            <span className="flex flex-col">
              <span className="font-semibold">
                {last(item.path.split("/"))}
              </span>
              {isError(item) && <span>{item.error.message}</span>}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

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
