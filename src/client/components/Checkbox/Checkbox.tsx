import { type HTMLProps, useEffect, useRef } from "react";
import { cx } from "~/client/utils/cx";

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
      className={cx(
        "rounded border-base-300 bg-base-100 text-primary-500 focus:ring-2 focus:ring-blue-500",
        className
      )}
      {...rest}
    />
  );
};
