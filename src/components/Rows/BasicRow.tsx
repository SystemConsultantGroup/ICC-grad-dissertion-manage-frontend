import { Box, BoxProps, Group, Text } from "@mantine/core";
import { ReactNode } from "react";
import RowValueText from "./_elements/RowValueText";

export interface RowProps extends BoxProps {
  field?: string; // 필드 이름 ex) '학과, 이름' 등.
  children: ReactNode;
  fieldSize?: "sm" | "md" | "lg"; // 필드 부분이 차지하는 사이즈가 더 큰 것이 요구될 시
}

const FIELD_SIZES = {
  sm: 106,
  md: 138,
  lg: 300,
};

function Row({ field = "", fieldSize = "md", children, ...props }: RowProps) {
  return (
    <Box
      {...props}
      style={{
        minWidth: 411,
      }}
    >
      <Group gap={0}>
        <Text
          style={{
            minWidth: fieldSize ? FIELD_SIZES[fieldSize] : 300,
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
