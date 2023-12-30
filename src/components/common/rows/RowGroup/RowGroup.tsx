import { GroupProps, Group } from "@mantine/core";
import { CSSProperties, ReactNode } from "react";
import { useRowGroupStyles } from "./RowGroup.css";

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
  const style = useRowGroupStyles({ backgroundColor, withBorderBottom });
  return (
    <Group {...props} gap={0} style={style}>
      {children}
    </Group>
  );
}

export default RowGroup;