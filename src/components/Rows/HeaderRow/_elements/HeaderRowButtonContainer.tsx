"use client";

import { Box, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function HeaderRowButtonContainer({ children }: Props) {
  const theme = useMantineTheme();

  return <Box style={{ color: theme.colors.gray[6], fontSize: "12px" }}>{children}</Box>;
}

export default HeaderRowButtonContainer;
