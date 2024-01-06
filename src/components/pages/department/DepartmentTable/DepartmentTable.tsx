import React, { ReactNode } from "react";
import { Paper, Stack } from "@mantine/core";

interface Props {
  children: ReactNode;
}
function DepartmentTable({ children }: Props) {
  return (
    <Paper p={16} radius={4} shadow="xs">
      <Stack gap={0}>{children}</Stack>
    </Paper>
  );
}

export default DepartmentTable;
