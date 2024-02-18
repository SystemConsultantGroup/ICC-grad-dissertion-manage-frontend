import { CSSProperties } from "react";

export interface RowGroupStylesParams {
  backgroundColor: CSSProperties["backgroundColor"];
  withBorderBottom?: boolean;
}

export const useRowGroupStyles = ({
  backgroundColor,
  withBorderBottom = false,
}: RowGroupStylesParams) => ({
  backgroundColor,
  paddingLeft: 20,
  paddingRight: 20,
  minHeight: 56,
  width: "100%",
  borderBottom: withBorderBottom ? "1px solid var(--mantine-color-gray-2)" : "none",
});
