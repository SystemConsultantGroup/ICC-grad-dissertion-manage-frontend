import React, { Key, ReactNode } from "react";

export interface TableHeaderProps {
  key?: Key;
  label: string | ReactNode;
  widthPercentage?: number;
}

function TableHeader({ label, widthPercentage }: TableHeaderProps) {
  return (
    <th
      style={{
        width: widthPercentage ? `${widthPercentage}%` : "auto",
      }}
    >
      {label}
    </th>
  );
}

export default TableHeader;
