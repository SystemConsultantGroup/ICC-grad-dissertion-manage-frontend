import React, { ReactNode } from "react";
import { TableTr } from "@mantine/core";
import classes from "./TableFilterRow.module.css";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

function TableFilterRow({ children }: Props) {
  return <TableTr className={classes.container}>{children}</TableTr>;
}

export default TableFilterRow;
