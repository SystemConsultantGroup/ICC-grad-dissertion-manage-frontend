import { Stack, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

export interface PhaseReadyProps {
  title: string;
  start: string;
  end: string;
}

export default function PhaseReady({ title, start, end }: PhaseReadyProps) {
  return (
    <Stack align="center" p={32} gap={0}>
      <IconAlertTriangle />
      <Text fw={700} fz={24} mt={16} mb={32}>
        지금은 {title} 기간이 아닙니다.
      </Text>
      <Text fz={18} mb={12}>
        해당 기간은 {start} ~ {end}로 설정되어 있습니다.
      </Text>
      <Text fz={18}>오류가 있을 시 행정실로 문의해주세요.</Text>
    </Stack>
  );
}
