"use client";

import React, { ReactNode } from "react";
import { Box, Stack, useMantineTheme } from "@mantine/core";

interface Props {
  children: ReactNode;
}
function DepartmentTable({ children }: Props) {
  const theme = useMantineTheme();

  return (
    <Box style={{}}>
      <Stack gap={0}>{children}</Stack>
    </Box>
  );
}

export default DepartmentTable;
