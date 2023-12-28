/* commit을 위한 임시 코드입니다. */

import { Group } from "@mantine/core";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function RowGroup({ children, ...props }: Props) {
  return <Group {...props}>{children}</Group>;
}

export default RowGroup;
