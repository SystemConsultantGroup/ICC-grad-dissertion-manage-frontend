"use client";

import { Clock } from "@/components/common/Clock";
import { Section } from "@/components/common/Section";
import { Button, Group, Select, Stack, Text } from "@mantine/core";
import { BasicRow, RowGroup, TitleRow } from "@/components/common/rows";
import usePhases from "@/api/SWR/usePhases";
import { useDepartments } from "@/api/SWR";
import { isNotEmpty, useForm } from "@mantine/form";
import { API_ROUTES } from "@/api/apiRoute";
import { ClientAxios } from "@/api/ClientAxios";
import { showNotificationSuccess } from "@/components/common/Notifications";
import { useEffect } from "react";
import PhaseEditFormRow from "./PhaseEditFormRow";

interface ModificationEditFormInputs {
  id: string;
}

function SystemSection() {
  const { data: PhasesData, isLoading: isPhasesLoading } = usePhases();
  const { data: DepartmentsData, isLoading: isDeptLoading, mutate } = useDepartments();

  const { onSubmit: onExcludeSubmit, getInputProps: getExcludeInputProps } =
    useForm<ModificationEditFormInputs>({
      validate: {
        id: isNotEmpty("학과를 선택해주세요."),
      },
    });

  const { onSubmit: onCancelSubmit, getInputProps: getCancelInputProps } =
    useForm<ModificationEditFormInputs>({
      validate: {
        id: isNotEmpty("학과를 선택해주세요."),
      },
    });

  const handleExcludeSubmit = async (value: ModificationEditFormInputs) => {
    try {
      await ClientAxios.put(API_ROUTES.department.put(value.id, true));
      showNotificationSuccess({ message: `학과를 제외하였습니다.` });
      mutate();
    } catch (error) {
      /* empty */
    }
  };

  const handleCancelSubmit = async (value: ModificationEditFormInputs) => {
    try {
      await ClientAxios.put(API_ROUTES.department.put(value.id, false));
      showNotificationSuccess({ message: `학과 제외를 취소하였습니다.` });
      mutate();
    } catch (error) {
      /* empty */
    }
  };

  useEffect(() => {
    console.log(PhasesData);
  });

  return (
    <Section>
      <Stack>
        {/* <Stack gap={0}>
          <TitleRow title="시스템 현재 시간" />
          <Stack style={{ padding: 20 }}>
            <Text size="lg" c="dimmed">
              <Clock />
            </Text>
          </Stack>
        </Stack> */}
        <Stack gap={0}>
          <TitleRow
            title="시스템 일정 설정"
            subString="시스템 일정 시작일시와 종료일시를 입력해주세요."
          />
          {!isPhasesLoading &&
            PhasesData?.phases.map((phase, index) => (
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
            <form onSubmit={onExcludeSubmit(handleExcludeSubmit)}>
              <BasicRow field="학과 제외">
                <Group>
                  <Select
                    w={250}
                    data={DepartmentsData?.departments
                      .filter((department) => department.modificationFlag)
                      .map((department) => ({
                        label: department.name,
                        value: String(department.id),
                      }))}
                    {...getExcludeInputProps("id")}
                  />
                  <Button bg="red" key="exclude" type="submit">
                    제외하기
                  </Button>
                </Group>
              </BasicRow>
            </form>
          </RowGroup>
          <RowGroup>
            <form onSubmit={onCancelSubmit(handleCancelSubmit)}>
              <BasicRow field="제외 학과 목록">
                <Group>
                  <Select
                    w={250}
                    data={DepartmentsData?.departments
                      .filter((department) => !department.modificationFlag)
                      .map((department) => ({
                        label: department.name,
                        value: String(department.id),
                      }))}
                    {...getCancelInputProps("id")}
                  />
                  <Button bg="red" key="calcel" type="submit">
                    제외 취소
                  </Button>
                </Group>
              </BasicRow>
            </form>
          </RowGroup>
        </Stack>
      </Stack>
    </Section>
  );
}

export default SystemSection;
