import { type HTMLProps, useEffect, useRef } from "react";

interface Props extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean;
}

export const Checkbox = ({ indeterminate, ...rest }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current || typeof indeterminate !== "boolean") return;
    ref.current.indeterminate = indeterminate;
  }, [ref, indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:outline-0 focus:outline-2"
      {...rest}
    />
  );
};
