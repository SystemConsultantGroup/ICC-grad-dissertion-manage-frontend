import { showNotification, NotificationData } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

interface Props extends NotificationData {}

export function showNotificationSuccess(props: Props) {
  return showNotification({
    icon: <IconCheck />,
    color: "blue",
    ...props,
  });
}
