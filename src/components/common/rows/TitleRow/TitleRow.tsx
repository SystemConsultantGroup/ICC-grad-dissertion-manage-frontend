import { Group, MantineStyleProp, Text } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./TitleRow.module.css";

interface Props {
  title: ReactNode;
  badge?: ReactNode;
  subString?: ReactNode;
  style?: MantineStyleProp;
}

function TitleRow({ title, badge, subString, style }: Props) {
  return (
    <Group gap={0} className={classes.wrapper} justify="space-between" style={style}>
      <Group>
        <Text className={classes.title}>{title}</Text>
        {badge}
      </Group>
      <Text c="dimmed">{subString}</Text>
    </Group>
  );
}

export default TitleRow;
