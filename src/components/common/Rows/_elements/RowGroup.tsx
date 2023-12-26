"use client";

import { GroupProps, Group, MantineTheme, useMantineTheme } from "@mantine/core";
import { CSSProperties, ReactNode } from "react";

interface Props extends GroupProps {
  children: ReactNode;
  withBorderBottom?: boolean;
  backgroundColor?: CSSProperties["backgroundColor"];
}

function RowGroup({
  children,
  withBorderBottom = true,
  backgroundColor = "white",
  ...props
}: Props) {
  const theme = useMantineTheme();

  return (
    <Group
      {...props}
      gap={0}
      style={RowGroupStyles(theme, {
        withBorderBottom,
        backgroundColor,
      })}
    >
      {children}
    </Group>
  );
}

interface RowGroupStylesParams {
  backgroundColor: CSSProperties["backgroundColor"];
  withBorderBottom?: boolean;
}

function RowGroupStyles(
  theme: MantineTheme,
  { backgroundColor, withBorderBottom }: RowGroupStylesParams
) {
  return {
    backgroundColor,
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: 56,
    width: "100%",
    borderBottom: withBorderBottom ? `1px solid ${theme.colors.gray[2]}` : "none",
  };
}

export default RowGroup;
