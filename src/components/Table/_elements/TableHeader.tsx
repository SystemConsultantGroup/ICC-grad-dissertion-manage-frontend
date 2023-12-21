import { Table } from "@mantine/core";
import React, { Key, ReactNode } from "react";

export interface TableHeaderProps {
  key?: Key;
  label: string | ReactNode;
  widthPercentage?: number;
}

function TableHeader({ label, widthPercentage }: TableHeaderProps) {
  return (
    <Table.Th
      style={{
        width: widthPercentage ? `${widthPercentage}%` : "auto",
      }}
    >
      {label}
    </Table.Th>
  );
}

export default TableHeader;
