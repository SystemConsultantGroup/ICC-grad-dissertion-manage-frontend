import { Text } from "@mantine/core";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function TableData({ children }: Props) {
  return (
    <td>
      <Text fz="md">{children}</Text>
    </td>
  );
}

export default TableData;
