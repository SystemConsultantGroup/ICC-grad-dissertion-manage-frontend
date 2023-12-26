import { Flex, Stack } from "@mantine/core";
import { Key, ReactNode } from "react";

import classes from "@/components/DividedList/DividedList.module.css";

export interface DividedListProps {
  itemKey?: (index: number) => Key;
  dividers?: { top?: boolean; bottom?: boolean };
  children: ReactNode[];
}

export function DividedList({ itemKey, dividers = {}, children }: DividedListProps) {
  return (
    <Stack
      gap={0}
      className={classes.root}
      data-divider-top={dividers.top ?? true}
      data-divider-bottom={dividers.bottom ?? true}
    >
      {children.map((child, index) => (
        <Flex key={itemKey?.(index) ?? index} className={classes.item}>
          {child}
        </Flex>
      ))}
    </Stack>
  );
}
