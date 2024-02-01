import { DateTimeFormatOptions } from "intl";
import dayjs from "dayjs";

export function formatTime(date: Date) {
  const options: DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedTime = date.toLocaleString("ko-KR", options);
  return formattedTime;
}

export function formatUTCDate(date: string | Date, formatString: string) {
  return dayjs(date).format(formatString);
}

export function formatToDotDate(date: string | Date) {
  return dayjs(date).format("YYYY.MM.DD");
}

export function formatToHypenDate(date: string | Date) {
  return dayjs(date).format("YYYY-MM-DD");
}
