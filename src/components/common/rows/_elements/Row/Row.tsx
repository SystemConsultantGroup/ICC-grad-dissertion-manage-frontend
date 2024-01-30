import { Box, BoxProps, Group, Text } from "@mantine/core";
import { ReactNode } from "react";
import classes from "./Row.module.css";
import RowValueText from "../RowValueText/RowValueText";

export interface RowProps extends BoxProps {
  field?: string; // 필드 이름 ex) '학과, 이름' 등.
  children: ReactNode;
  fieldSize?: "sm" | "md" | "lg" | "xl"; // 필드 부분이 차지하는 사이즈가 더 큰 것이 요구될 시
}

function Row({ field = "", fieldSize = "md", children, ...props }: RowProps) {
  return (
    <Box className={classes.wrapper} {...props}>
      <Group gap={0} wrap="nowrap">
        <Text
          style={{
            minWidth:
              fieldSize === "sm"
                ? 80
                : fieldSize === "md"
                  ? 138
                  : fieldSize === "lg"
                    ? 200
                    : fieldSize === "xl"
                      ? 300
                      : 300,
          }}
        >
          {field}
        </Text>
        {children}
      </Group>
    </Box>
  );
}

Row.Text = RowValueText;

export default Row;
