import { Text } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./RowSubfieldText.module.css";

interface Props {
  children: ReactNode;
}

function RowSubFieldText({ children }: Props) {
  return <Text className={classes.subFieldText}>{children}</Text>;
}

export default RowSubFieldText;
