/*
 * 임시 페이지입니다.
 * api 개발이 완료되면 api 연결이 필요합니다.
 */

import Clock from "@/components/common/Clock/Clock";
import { Section } from "@/components/common/Section";
import { Button, Group, Select, Stack, Text } from "@mantine/core";
import { BasicRow, RowGroup, TitleRow } from "@/components/common/rows";
import DateTimePicker from "@/components/common/DatePicker/DateTimePicker";

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
            subString="시스템 일정 시작일시와 종료일시를 입력해주세요."
          />
          <RowGroup>
            <Text fw={600}>예심</Text>
          </RowGroup>
          <RowGroup>
            <BasicRow field="논문 업로드 기간">
              <Group>
                <DateTimePicker /> -
                <DateTimePicker />
                <Button>즉시 실행</Button>
              </Group>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="심사 기간">
              <Group>
                <DateTimePicker /> -
                <DateTimePicker />
                <Button>즉시 실행</Button>
              </Group>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="최종 심사 기간">
              <Group>
                <DateTimePicker /> -
                <DateTimePicker />
                <Button>즉시 실행</Button>
              </Group>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <Text fw={600}>본심</Text>
          </RowGroup>
          <RowGroup>
            <BasicRow field="논문 업로드 기간">
              <Group>
                <DateTimePicker /> -
                <DateTimePicker />
                <Button>즉시 실행</Button>
              </Group>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="심사 기간">
              <Group>
                <DateTimePicker /> -
                <DateTimePicker />
                <Button>즉시 실행</Button>
              </Group>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="최종 심사 기간">
              <Group>
                <DateTimePicker /> -
                <DateTimePicker />
                <Button>즉시 실행</Button>
              </Group>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <Text fw={600}>수정지시사항 제출</Text>
          </RowGroup>
          <RowGroup>
            <BasicRow field="업로드 기간">
              <Group>
                <DateTimePicker /> -
                <DateTimePicker />
                <Button>즉시 실행</Button>
              </Group>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="확인 기간">
              <Group>
                <DateTimePicker /> -
                <DateTimePicker />
                <Button>즉시 실행</Button>
              </Group>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="학과 제외">
              <Group>
                <Select w={250} />
                <Button bg="red">제외하기</Button>
              </Group>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="제외 학과 목록">
              <Group>
                <Select w={250} />
                <Button bg="red">제외 취소</Button>
              </Group>
            </BasicRow>
          </RowGroup>
        </Stack>
      </Stack>
    </Section>
  );
}

export default SystemSection;
