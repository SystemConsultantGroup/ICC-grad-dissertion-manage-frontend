import { Box, Button, Group, Stack, Text } from "@mantine/core";
import classes from "./DepartmentTableRow.module.css";

interface Props {
  id: number;
  name: string;
  userCount: number;
}

function DepartmentTableRow({ id, name, userCount }: Props) {
  return (
    <Box className={classes.wrapper}>
      <Group justify="space-between">
        <Stack gap={8}>
          <Text className={classes.deptNameText}>{name}</Text>
          <Text className={classes.userCountText}>{userCount}명 소속</Text>
        </Stack>
        <Button className={classes.deleteButton}>학과 삭제</Button>
      </Group>
    </Box>
  );
}

export default DepartmentTableRow;
