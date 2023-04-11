import classNames from "classnames";
import { compose } from "ramda";
import { twMerge } from "tailwind-merge";

export const cx = compose(twMerge, classNames);
