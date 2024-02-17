import { Text, Group } from "@mantine/core";
import Row from "@/components/common/rows/_elements/Row/Row";
import classes from "./LongContentRow.module.css";

interface Props {
  field: string;
  content?: string;
}

function LongContentRow({ field, content }: Props) {
  return (
    <Group gap={0} className={classes.wrapper}>
      <Row field={field} flexStart>
        <Text className={classes.content}>{content}</Text>
      </Row>
    </Group>
  );
}

export default LongContentRow;
