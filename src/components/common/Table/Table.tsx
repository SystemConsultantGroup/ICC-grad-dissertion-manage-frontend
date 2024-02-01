import React, { ReactNode } from "react";
import {
  Table as MantineTable,
  ScrollArea,
  ScrollAreaProps,
  TableTbody,
  TableThead,
  TableTr,
} from "@mantine/core";
import TableRow from "@/components/common/Table/_elements/TableRow";
import TableData from "@/components/common/Table/_elements/TableData";
import TableHeader, { TableHeaderProps } from "@/components/common/Table/_elements/TableHeader";
import TableTextInput from "@/components/common/Table/_elements/TableTextInput";
import TableSelect from "@/components/common/Table/_elements/TableSelect";
import TableFilterRow from "./_elements/TableFilterRow";
import classes from "./Table.module.css";

interface Props extends ScrollAreaProps {
  headers: TableHeaderProps[];
  children: ReactNode;
}
function Table({ headers, children, ...props }: Props) {
  return (
    <ScrollArea type="hover" offsetScrollbars className={classes.container} {...props}>
      <MantineTable>
        <TableThead className={classes.header}>
          <TableTr>
            {headers.map((header, index) => (
              <TableHeader
                key={index}
                label={header.label}
                widthPercentage={header.widthPercentage}
              />
            ))}
          </TableTr>
        </TableThead>
        <TableTbody>{children}</TableTbody>
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
