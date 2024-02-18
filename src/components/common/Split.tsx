import { Flex, FlexProps } from "@mantine/core";
import React, { ReactNode } from "react";

interface Props extends FlexProps {
  children: ReactNode;
}

// flex 컨테이너 with justify: space-between, width: "100%", align: center
function Split({ children, ...props }: Props) {
  return (
    <Flex justify="space-between" align="center" style={{ width: "100%" }} {...props}>
      {children}
    </Flex>
  );
}

export default Split;
