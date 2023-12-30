import { Box, BoxProps } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./Section.module.css";

interface Props extends BoxProps {
  children: ReactNode;
}

function Section({ children, ...props }: Props) {
  return (
    <Box component="section" className={classes.wrapper} {...props}>
      {children}
    </Box>
  );
}

export default Section;
