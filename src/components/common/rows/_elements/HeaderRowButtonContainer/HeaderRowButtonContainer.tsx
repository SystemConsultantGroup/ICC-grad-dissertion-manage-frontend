import { Box } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./HeaderRowButtonContainer.module.css";

interface Props {
  children: ReactNode;
}

function HeaderRowButtonContainer({ children }: Props) {
  return <Box className={classes.root}>{children}</Box>;
}

export default HeaderRowButtonContainer;
