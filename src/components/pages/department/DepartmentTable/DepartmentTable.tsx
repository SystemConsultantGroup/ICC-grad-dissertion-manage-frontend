import React, { ReactNode } from "react";
import { Box, Stack } from "@mantine/core";
import classes from "./DepartmentTable.module.css";

interface Props {
  children: ReactNode;
}
function DepartmentTable({ children }: Props) {
  return (
    <Box className={classes.wrapper}>
      <Stack gap={0}>{children}</Stack>
    </Box>
  );
}

export default DepartmentTable;
