"use client";

import { Box, BoxProps, MantineTheme, useMantineTheme } from "@mantine/core";
import { ReactNode } from "react";

interface Props extends BoxProps {
  children: ReactNode;
}

function Section({ children, ...props }: Props) {
  const theme = useMantineTheme();

  return (
    <Box component="section" style={SectionStyles(theme)} {...props}>
      {children}
    </Box>
  );
}

function SectionStyles(theme: MantineTheme) {
  return {
    width: "100%",
    borderRadius: 20,
    border: `1px solid ${theme.colors.gray[2]}`,
    background: `${theme.white}`,
    padding: 20,
  };
}

export default Section;
