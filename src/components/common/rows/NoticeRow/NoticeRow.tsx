import { IconInfoCircle } from "@tabler/icons-react";
import { ReactNode } from "react";
import RowGroup from "@/components/common/rows/RowGroup/RowGroup";
import { Group } from "@mantine/core";

interface Props {
  icon?: ReactNode;
  text: ReactNode;
  withBorderBottom?: boolean;
}

export function NoticeRow({ icon = <IconInfoCircle size={24} />, text, withBorderBottom }: Props) {
  return (
    <RowGroup withBorderBottom={withBorderBottom}>
      <Group gap="md" align="center">
        {icon}
        {text}
      </Group>
    </RowGroup>
  );
}
