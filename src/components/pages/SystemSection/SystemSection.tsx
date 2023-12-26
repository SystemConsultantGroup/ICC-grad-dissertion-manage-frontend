import Clock from "@/components/common/Clock/Clock";
import { Row } from "@/components/common/Rows";
import HeaderRow from "@/components/common/Rows/HeaderRow/HeaderRow";
import Section from "@/components/common/Section";
import Split from "@/components/common/Split";
import { Stack, Text } from "@mantine/core";

function SystemSection() {
  return (
    <Section>
      <HeaderRow>
        <Split>
          <HeaderRow.Title>시스템 현재 시간</HeaderRow.Title>
        </Split>
      </HeaderRow>
      <Stack>
        <Text size="lg" c="dimmed" style={{ paddingLeft: "20px" }}>
          <Clock />
        </Text>
      </Stack>
    </Section>
  );
}

export default SystemSection;
