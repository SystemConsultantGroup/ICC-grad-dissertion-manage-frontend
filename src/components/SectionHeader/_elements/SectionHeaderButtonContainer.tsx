import { Group } from "@mantine/core";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function SectionHeaderButtonContainer({ children }: Props) {
  return <Group gap={20}>{children}</Group>;
}

export default SectionHeaderButtonContainer;
