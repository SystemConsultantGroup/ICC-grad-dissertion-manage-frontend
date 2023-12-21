"use client";

import { Box, BoxProps, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";

interface Props extends BoxProps {
  children: ReactNode;
}

function Section({ children, ...props }: Props) {
  const theme = useMantineTheme();

  return (
    <Box
      component="section"
      style={{
        width: "100%",
        borderRadius: 20,
        border: `1px solid ${theme.colors.gray[2]}`,
        background: theme.white,
        padding: 20,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default Section;
