import React, { ReactNode } from "react";
import { Table as MantineTable } from "@mantine/core";
import TableRow from "@/components/Table/_elements/TableRow";
import TableData from "@/components/Table/_elements/TableData";
import TableHeader, { TableHeaderProps } from "@/components/Table/_elements/TableHeader";
import TableTextInput from "@/components/Table/_elements/TableTextInput";
import TableSelect from "@/components/Table/_elements/TableSelect";

interface Props {
  headers: TableHeaderProps[];
  children: ReactNode;
}
function Table({ headers, children }: Props) {
  return (
    <MantineTable>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <TableHeader
              key={index}
              label={header.label}
              widthPercentage={header.widthPercentage}
            />
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </MantineTable>
  );
}

Table.Row = TableRow;
Table.Data = TableData;
Table.TextInput = TableTextInput;
Table.Select = TableSelect;

export default Table;
