import { type HTMLAttributes, type PropsWithChildren } from "react";
import classNames from "classnames";

interface Props
  extends PropsWithChildren<
    HTMLAttributes<HTMLParagraphElement | HTMLSpanElement>
  > {
  as?: "span" | "p";
  size?: "xs" | "sm" | "md" | "lg";
}

export const Text = ({
  as: Component = "span",
  size = "md",
  className,
  children,
  ...rest
}: Props) => {
  return (
    <Component
      className={classNames(
        { xs: "text-xs", sm: "text-sm", md: "text-md", lg: "text-lg" }[size],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
