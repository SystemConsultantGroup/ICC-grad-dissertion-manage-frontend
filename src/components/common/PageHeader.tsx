import { Group, Stack, Text } from "@mantine/core";
import SectionTitle from "@/components/common/SectionTitle";

interface Props {
  /** 페이지 제목 */
  title: string;
  /** 페이지 설명 */
  description?: string;
}

/** 페이지 상단에 들어가는 헤더 컴포넌트 */
function PageHeader({ title, description }: Props) {
  return (
    <Group justify="space-between" align="flex-start" style={{ marginBottom: 40 }}>
      <Stack gap={16}>
        <SectionTitle>{title}</SectionTitle>
        <Text fz={16}>{description ?? ""}</Text>
      </Stack>
    </Group>
  );
}

export default PageHeader;
