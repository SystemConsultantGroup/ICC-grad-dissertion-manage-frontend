"use client";

import { Text, useMantineTheme } from "@mantine/core";

interface Props {
  children: string;
}

function HeaderRowTitle({ children }: Props) {
  const theme = useMantineTheme();

  return (
    <Text key="1" style={{ color: theme.black, fontSize: 20, fontWeight: 400 }}>
      {children}
    </Text>
  );
}

export default HeaderRowTitle;
