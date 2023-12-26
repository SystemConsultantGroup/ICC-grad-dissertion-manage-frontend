"use client";

import { Text, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function RowValueText({ children }: Props) {
  const theme = useMantineTheme();

  return <Text style={{ fontWeight: theme.other.fontWeight.bold }}>{children}</Text>;
}

export default RowValueText;
