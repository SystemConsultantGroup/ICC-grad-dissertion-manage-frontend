import Clock from "@/components/common/Clock/Clock";
import { DatePicker } from "@/components/common/DatePicker";
import { Section } from "@/components/common/Section";
import { Button, Group, Stack, Text } from "@mantine/core";
import { BasicRow, RowGroup, TitleRow } from "@/components/common/rows";

function SystemSection() {
  return (
    <Section>
      <Stack>
        <Stack gap={0}>
          <TitleRow title="시스템 현재 시간" />
          <Stack style={{ padding: 20 }}>
            <Text size="lg" c="dimmed">
              <Clock />
            </Text>
          </Stack>
        </Stack>
        <Stack gap={0}>
          <TitleRow
            title="시스템 일정 설정"
            subString="※ 모든 일정은 마지막날 23시 59분에 자동 처리 됩니다. 시스템 락은 2월 28일, 8월 31일에
            자동 해제 됩니다."
          />
          <RowGroup>
            <BasicRow field="예심">
              <></>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="논문 업로드 기간">
              <Group>
                <DatePicker type="range" />
                <Button>즉시 실행</Button>
              </Group>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="심사 기간">
              <Group>
                <DatePicker type="range" />
                <Button>즉시 실행</Button>
              </Group>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="최종 심사 기간">
              <Group>
                <DatePicker type="range" />
                <Button>즉시 실행</Button>
              </Group>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="본심">
              <></>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="논문 업로드 기간">
              <Group>
                <DatePicker type="range" />
                <Button>즉시 실행</Button>
              </Group>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="심사 기간">
              <Group>
                <DatePicker type="range" />
                <Button>즉시 실행</Button>
              </Group>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="최종 심사 기간">
              <Group>
                <DatePicker type="range" />
                <Button>즉시 실행</Button>
              </Group>
            </BasicRow>
          </RowGroup>
        </Stack>
      </Stack>
    </Section>
  );
}

export default SystemSection;
