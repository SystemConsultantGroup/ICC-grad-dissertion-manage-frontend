"use client";

import Clock from "@/components/common/Clock/Clock";
import { Section } from "@/components/common/Section";
import { Button, Group, Select, Stack, Text } from "@mantine/core";
import { BasicRow, RowGroup, TitleRow } from "@/components/common/rows";
import usePhases from "@/api/SWR/usePhases";
import PhaseEditFormRow from "./PhaseEditFormRow";

function SystemSection() {
  const { data: Phases, isLoading } = usePhases();

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
          {!isLoading &&
            Phases?.phases.map((phase, index) => (
              <PhaseEditFormRow
                key={index}
                id={phase.id}
                title={phase.title}
                start={phase.start}
                end={phase.end}
              />
            ))}
        </Stack>
        <Stack gap={0}>
          <TitleRow title="수정지시사항 단계 제외 학과" />
          <RowGroup>
            <BasicRow field="제외 학과 목록">
              <Group>
                <Select w={250} />
                <Button bg="red">제외 취소</Button>
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
        </Stack>
      </Stack>
    </Section>
  );
}

export default SystemSection;
