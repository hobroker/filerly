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

  return <input ref={ref} type="checkbox" {...rest} />;
};
