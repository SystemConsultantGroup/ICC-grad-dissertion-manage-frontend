import { CSSProperties, ReactNode } from "react";
import { GroupProps } from "@mantine/core";
import HeaderRowTitle from "./_elements/HeaderRowTitle";
import HeaderRowDescription from "./_elements/HeaderRowDescription";
import HeaderRowButtonContainer from "./_elements/HeaderRowButtonContainer";
import RowGroup from "../_elements/RowGroup";

interface Props extends GroupProps {
  children: ReactNode;
  withBorderBottom?: boolean;
  backgroundColor?: CSSProperties["backgroundColor"];
}

function HeaderRow({ children, ...props }: Props) {
  return <RowGroup {...props}>{children}</RowGroup>;
}

HeaderRow.Title = HeaderRowTitle;
HeaderRow.Description = HeaderRowDescription;
HeaderRow.Buttons = HeaderRowButtonContainer;

export default HeaderRow;
