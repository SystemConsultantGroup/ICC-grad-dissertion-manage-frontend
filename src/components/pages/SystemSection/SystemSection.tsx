import Clock from "@/components/Clock";
import { Row } from "@/components/Rows";
import HeaderRow from "@/components/Rows/HeaderRow/HeaderRow";
import Section from "@/components/Section";
import Split from "@/components/Split";
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
