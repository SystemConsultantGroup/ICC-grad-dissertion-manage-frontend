import { showNotification, NotificationData } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

interface Props extends NotificationData {}

export function showNotificationError({ ...props }: Props) {
  return showNotification({
    icon: <IconX />,
    color: "red",
    ...props,
  });
}
