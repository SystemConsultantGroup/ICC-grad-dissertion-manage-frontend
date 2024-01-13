import React, { ReactNode } from "react";
import { Table as MantineTable, ScrollArea } from "@mantine/core";
import TableRow from "@/components/common/Table/_elements/TableRow";
import TableData from "@/components/common/Table/_elements/TableData";
import TableHeader, { TableHeaderProps } from "@/components/common/Table/_elements/TableHeader";
import TableTextInput from "@/components/common/Table/_elements/TableTextInput";
import TableSelect from "@/components/common/Table/_elements/TableSelect";
import TableFilterRow from "./_elements/TableFilterRow";
import classes from "./Table.module.css";

interface Props {
  headers: TableHeaderProps[];
  children: ReactNode;
  simple?: boolean;
}
function Table({ headers, children, simple = false }: Props) {
  return (
    <ScrollArea type="hover" offsetScrollbars className={!simple ? classes.container : undefined}>
      <MantineTable>
        <MantineTable.Thead className={classes.header}>
          <MantineTable.Tr>
            {headers.map((header, index) => (
              <TableHeader
                key={index}
                label={header.label}
                widthPercentage={header.widthPercentage}
              />
            ))}
          </MantineTable.Tr>
        </MantineTable.Thead>
        <MantineTable.Tbody>{children}</MantineTable.Tbody>
      </MantineTable>
    </ScrollArea>
  );
}

Table.Row = TableRow;
Table.FilterRow = TableFilterRow;
Table.Data = TableData;
Table.TextInput = TableTextInput;
Table.Select = TableSelect;

export default Table;
