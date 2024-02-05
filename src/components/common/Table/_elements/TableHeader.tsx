import { TableTh } from "@mantine/core";
import React, { Key, ReactNode } from "react";

export interface TableHeaderProps {
  key?: Key;
  label: string | ReactNode;
  widthPercentage?: number;
}

function TableHeader({ label, widthPercentage }: TableHeaderProps) {
  return (
    <TableTh
      style={{
        width: widthPercentage ? `${widthPercentage}%` : "auto",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </TableTh>
  );
}

export default TableHeader;
