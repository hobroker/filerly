import { DateTime } from "luxon";

export const toFormattedDate = (ms: number): string => {
  const dateObj = DateTime.fromMillis(ms);
  const today = DateTime.local();
  if (dateObj.hasSame(today, "day")) {
    return dateObj.toLocaleString(DateTime.TIME_SIMPLE);
  }

  return dateObj.toLocaleString(DateTime.DATE_MED);
};
