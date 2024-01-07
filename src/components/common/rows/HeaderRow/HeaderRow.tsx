import { ReactNode } from "react";
import RowGroup from "@/components/common/rows/RowGroup/RowGroup";
import HeaderRowTitle from "@/components/common/rows/_elements/HeaderRowTitle/HeaderRowTitle";
import HeaderRowDescription from "@/components/common/rows/_elements/HeaderRowDescription/HeaderRowDescription";
import HeaderRowButtonContainer from "@/components/common/rows/_elements/HeaderRowButtonContainer/HeaderRowButtonContainer";

interface Props {
  children: ReactNode;
}

function HeaderRow({ children, ...props }: Props) {
  return <RowGroup {...props}>{children}</RowGroup>;
}

HeaderRow.Title = HeaderRowTitle;
HeaderRow.Description = HeaderRowDescription;
HeaderRow.Buttons = HeaderRowButtonContainer;

export default HeaderRow;
