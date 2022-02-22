import { addDays } from "date-fns";

export function getPlatformDate(date: Date) {
  return addDays(date, 1);
  // if (Platform.OS === "ios") {
  //   return addDays(date, 1);
  // } else {
  //   return date;
  // }
}
