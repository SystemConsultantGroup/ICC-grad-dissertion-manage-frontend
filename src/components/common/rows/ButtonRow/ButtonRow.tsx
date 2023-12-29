import { Group } from "@mantine/core";
import { ReactNode } from "react";
import classes from "ButtonRow.module.css";

interface Props {
  buttons: ReactNode[];
}

function ButtonRow({ buttons }: Props) {
  return <Group className={classes.wrapper}>{buttons}</Group>;
}
export default ButtonRow;
