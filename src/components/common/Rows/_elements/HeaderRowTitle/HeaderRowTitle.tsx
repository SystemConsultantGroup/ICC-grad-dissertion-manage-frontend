import { Text } from "@mantine/core";
import classes from "./HeaderRowTitle.module.css";

interface Props {
  children: string;
}

function HeaderRowTitle({ children }: Props) {
  return <Text className={classes.root}>{children}</Text>;
}

export default HeaderRowTitle;
