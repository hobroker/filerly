import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const SafeHydrate = ({ children }: Props) => (
  <div suppressHydrationWarning>
    {typeof window === "undefined" ? null : children}
  </div>
);
