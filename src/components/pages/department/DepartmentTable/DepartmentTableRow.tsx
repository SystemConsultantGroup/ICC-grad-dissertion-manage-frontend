"use client";

import { Box, Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";

interface Props {
  id: number;
  name: string;
  userCount: number;
}

function DepartmentTableRow({ id, name, userCount }: Props) {
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        padding: "12px 8px 12px 8px",
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
        height: 71,
      }}
    >
      <Group justify="space-between">
        <Stack gap={0}>
          <Text fw={500}>{name}</Text>
          <Text c={theme.colors.gray[6]} fz={theme.fontSizes.sm}>
            {userCount}명 소속
          </Text>
        </Stack>
        <Button color={theme.colors.red[9]}>학과 삭제</Button>
      </Group>
    </Box>
  );
}

export default DepartmentTableRow;
