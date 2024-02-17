import { DateTimePickerProps, DateTimePicker as MantineDateTimePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { DATE_TIME_FORMAT_HYPHEN } from "@/constants/date";
import classes from "./DateTimePicker.module.css";
import "dayjs/locale/ko";

function DateTimePicker(props: DateTimePickerProps) {
  return (
    <MantineDateTimePicker
      locale="ko"
      leftSection={<IconCalendar size={20} />}
      leftSectionPointerEvents="none"
      valueFormat={DATE_TIME_FORMAT_HYPHEN}
      className={classes.wrapper}
      {...props}
    />
  );
}

export default DateTimePicker;
