import React, { ReactNode } from "react";
import { Table } from "@mantine/core";
import classes from "./TableRow.module.css";

interface Props {
  pointer?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

function TableRow({ children, onClick, pointer = true }: Props) {
  return (
    <Table.Tr
      onClick={onClick}
      className={pointer ? classes.tableRow : classes.tableRowNoPointer}
      style={{
        height: 56,
      }}
    >
      {children}
    </Table.Tr>
  );
}

export default TableRow;
