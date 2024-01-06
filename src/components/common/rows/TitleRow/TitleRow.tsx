import { Group, Text } from "@mantine/core";
import classes from "./TitleRow.module.css";

interface Props {
  title: string;
  subString?: string;
}

function TitleRow({ title, subString }: Props) {
  return (
    <Group gap={0} className={classes.wrapper} justify="space-between">
      <Text className={classes.title}>{title}</Text>
      <Text c="dimmed">{subString}</Text>
    </Group>
  );
}

export default TitleRow;
