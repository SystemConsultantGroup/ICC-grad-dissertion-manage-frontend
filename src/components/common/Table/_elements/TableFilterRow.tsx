import React, { ReactNode } from "react";
import { Table } from "@mantine/core";
import classes from "./TableFilterRow.module.css";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

function TableFilterRow({ children }: Props) {
  return <Table.Tr className={classes.container}>{children}</Table.Tr>;
}

export default TableFilterRow;
