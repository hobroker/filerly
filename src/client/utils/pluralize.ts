import { curry } from "ramda";

export const pluralize = curry<
  (noun: string, count: number, suffix?: string) => string
>(
  (noun: string, count: number, suffix = "s") =>
    `${noun}${count !== 1 ? suffix : ""}`
);
