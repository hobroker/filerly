import { type HTMLProps, useEffect, useRef } from "react";
import classNames from "classnames";

interface Props extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean;
}

export const Checkbox = ({ indeterminate, className, ...rest }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current || typeof indeterminate !== "boolean") return;
    ref.current.indeterminate = indeterminate;
  }, [ref, indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      className={classNames(
        "rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500",
        className
      )}
      {...rest}
    />
  );
};
