import { Card, Stack } from "@mantine/core";
import { PropsWithChildren } from "react";

export function ReviewResultCard({ children }: PropsWithChildren) {
  return (
    <Card padding="lg">
      <Stack gap="xl">{children}</Stack>
    </Card>
  );
}
