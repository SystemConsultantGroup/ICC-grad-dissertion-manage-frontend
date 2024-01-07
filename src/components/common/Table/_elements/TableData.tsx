import { Table } from "@mantine/core";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function TableData({ children }: Props) {
  return <Table.Td fz={16}>{children}</Table.Td>;
}

export default TableData;
