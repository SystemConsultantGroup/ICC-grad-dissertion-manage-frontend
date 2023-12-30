import { Text } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./RowValueText.module.css";

interface Props {
  children: ReactNode;
}

function RowValueText({ children }: Props) {
  return <Text className={classes.valueText}>{children}</Text>;
}

export default RowValueText;
