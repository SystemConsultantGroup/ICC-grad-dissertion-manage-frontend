import { Text } from "@mantine/core";
import classes from "./HeaderRowDescription.module.css";

interface Props {
  children: string;
}

function HeaderRowDescription({ children, ...props }: Props) {
  return (
    <Text {...props} className={classes.root}>
      {children}
    </Text>
  );
}

export default HeaderRowDescription;
