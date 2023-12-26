"use client";

import { TextProps, Text, useMantineTheme } from "@mantine/core";

interface Props extends TextProps {
  children: string;
}

function HeaderRowDescription({ children, ...props }: Props) {
  const theme = useMantineTheme();
  return (
    <Text style={{ color: theme.colors.gray[6], fontSize: "12px" }} {...props}>
      {children}
    </Text>
  );
}

export default HeaderRowDescription;
