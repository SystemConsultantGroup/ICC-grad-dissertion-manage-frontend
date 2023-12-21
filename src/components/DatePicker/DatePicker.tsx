import {
  DatePickerInputProps,
  DatePickerType,
  DatePickerInput as MantineDatePicker,
} from "@mantine/dates";
import { IconCalendarEvent } from "@tabler/icons-react";
import { DATE_FORMAT_HYPHEN } from "@/constants/date";
import classes from "./DatePicker.module.css";
import "dayjs/locale/ko";

function DatePicker(props: DatePickerInputProps<DatePickerType>) {
  return (
    <MantineDatePicker
      locale="ko"
      className={classes.wrapper}
      rightSection={<IconCalendarEvent />}
      rightSectionPointerEvents="none"
      valueFormat={DATE_FORMAT_HYPHEN}
      {...props}
    />
  );
}

export default DatePicker;
