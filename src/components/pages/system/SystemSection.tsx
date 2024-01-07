import Clock from "@/components/common/Clock/Clock";
import { DatePicker } from "@/components/common/DatePicker";
import { Section } from "@/components/common/Section";
import Split from "@/components/common/Split";
import { Button, Group, Stack, Text } from "@mantine/core";
import { RowGroup } from "@/components/common/rows";
import HeaderRow from "@/components/common/rows/HeaderRow/HeaderRow";
import Row from "@/components/common/rows/BasicRow/BasicRow";

function SystemSection() {
  return (
    <Section>
      <HeaderRow>
        <Split>
          <HeaderRow.Title>시스템 현재 시간</HeaderRow.Title>
        </Split>
      </HeaderRow>
      <Stack style={{ padding: 20 }}>
        <Text size="lg" c="dimmed">
          <Clock />
        </Text>
      </Stack>
      <HeaderRow>
        <Split>
          <HeaderRow.Title>시스템 일정 설정</HeaderRow.Title>
          <HeaderRow.Description>
            ※ 모든 일정은 마지막날 23시 59분에 자동 처리 됩니다. 시스템 락은 2월 28일, 8월 31일에
            자동 해제 됩니다.
          </HeaderRow.Description>
        </Split>
      </HeaderRow>
      <Stack gap={0}>
        <RowGroup>
          <Row field="예심">
            <></>
          </Row>
        </RowGroup>
        <RowGroup>
          <Row field="논문 업로드 기간">
            <Group>
              <DatePicker type="range" />
              <Button>즉시 실행</Button>
            </Group>
          </Row>
        </RowGroup>
        <RowGroup>
          <Row field="심사 기간">
            <Group>
              <DatePicker type="range" />
              <Button>즉시 실행</Button>
            </Group>
          </Row>
        </RowGroup>
        <RowGroup>
          <Row field="최종 심사 기간">
            <Group>
              <DatePicker type="range" />
              <Button>즉시 실행</Button>
            </Group>
          </Row>
        </RowGroup>
        <RowGroup>
          <Row field="본심">
            <></>
          </Row>
        </RowGroup>
        <RowGroup>
          <Row field="논문 업로드 기간">
            <Group>
              <DatePicker type="range" />
              <Button>즉시 실행</Button>
            </Group>
          </Row>
        </RowGroup>
        <RowGroup>
          <Row field="심사 기간">
            <Group>
              <DatePicker type="range" />
              <Button>즉시 실행</Button>
            </Group>
          </Row>
        </RowGroup>
        <RowGroup>
          <Row field="최종 심사 기간">
            <Group>
              <DatePicker type="range" />
              <Button>즉시 실행</Button>
            </Group>
          </Row>
        </RowGroup>
      </Stack>
    </Section>
  );
}

export default SystemSection;
