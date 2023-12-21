import React, { ReactNode } from "react";
import classes from "./TableRow.module.css";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

function TableRow({ children, onClick }: Props) {
  return (
    <tr
      className={classes.tableRow}
      style={{
        height: 56,
        // eslint-disable-next-line no-extra-boolean-cast
        cursor: !!onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export default TableRow;
