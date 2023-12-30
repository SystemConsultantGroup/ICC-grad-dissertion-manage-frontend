import Clock from "@/components/common/Clock/Clock";
import { DatePicker } from "@/components/common/DatePicker";
import BasicRow from "@/components/common/Rows/BasicRow";
import HeaderRow from "@/components/common/Rows/HeaderRow/HeaderRow";
import RowGroup from "@/components/common/Rows/_elements/RowGroup";
import Section from "@/components/common/Section";
import Split from "@/components/common/Split";
import { Button, Group, Select, Stack, Text } from "@mantine/core";

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
          <HeaderRow.Buttons>
            <Button>수정하기</Button>
          </HeaderRow.Buttons>
        </Split>
      </HeaderRow>
      <Stack gap={0}>
        <RowGroup>
          <BasicRow field="학생 선택">
            <Group gap="sm">
              <Select />
              <Select />
            </Group>
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="예심">
            <></>
          </BasicRow>
        </RowGroup>
        <RowGroup withBorderBottom={false}>
          <BasicRow field="논문 업로드 기간">
            <Group>
              <DatePicker type="range" w={400} />
              <Button>즉시 실행</Button>
            </Group>
          </BasicRow>
        </RowGroup>
        <RowGroup withBorderBottom={false}>
          <BasicRow field="심사 기간">
            <Group>
              <DatePicker type="range" w={400} />
              <Button>즉시 실행</Button>
            </Group>
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="최종 심사 기간">
            <Group>
              <DatePicker type="range" w={400} />
              <Button>즉시 실행</Button>
            </Group>
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="본심">
            <></>
          </BasicRow>
        </RowGroup>
        <RowGroup withBorderBottom={false}>
          <BasicRow field="논문 업로드 기간">
            <Group>
              <DatePicker type="range" w={400} />
              <Button>즉시 실행</Button>
            </Group>
          </BasicRow>
        </RowGroup>
        <RowGroup withBorderBottom={false}>
          <BasicRow field="심사 기간">
            <Group>
              <DatePicker type="range" w={400} />
              <Button>즉시 실행</Button>
            </Group>
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="최종 심사 기간">
            <Group>
              <DatePicker type="range" w={400} />
              <Button>즉시 실행</Button>
            </Group>
          </BasicRow>
        </RowGroup>
      </Stack>
    </Section>
  );
}

export default SystemSection;
