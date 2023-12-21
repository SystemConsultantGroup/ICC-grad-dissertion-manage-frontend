import { Table, Text } from "@mantine/core";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function TableData({ children }: Props) {
  return (
    <Table.Td>
      <Text fz="md">{children}</Text>
    </Table.Td>
  );
}

export default TableData;
