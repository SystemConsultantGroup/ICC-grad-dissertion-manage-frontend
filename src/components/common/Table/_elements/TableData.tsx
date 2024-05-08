import { TableTd } from "@mantine/core";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function TableData({ children }: Props) {
  return (
    <TableTd
      fz={16}
      style={{
        maxWidth: "500px",
        wordBreak: "break-all",
      }}
    >
      {children}
    </TableTd>
  );
}

export default TableData;
