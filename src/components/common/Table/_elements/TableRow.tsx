import React, { ReactNode } from "react";
import { TableTr } from "@mantine/core";
import classes from "./TableRow.module.css";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

function TableRow({ children, onClick }: Props) {
  return (
    <TableTr onClick={onClick} className={onClick ? classes.container : classes.containerNoPointer}>
      {children}
    </TableTr>
  );
}

export default TableRow;
