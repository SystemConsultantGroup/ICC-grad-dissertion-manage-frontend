"use client";

import useDepartments from "@/api/SWR/useDepartments";
import { DepartmentTable, DepartmentTableRow } from "@/components/pages/department/DepartmentTable";
import { Section } from "@/components/common/Section";
import { Button, Group, Select, Stack } from "@mantine/core";
import { BasicRow, RowGroup, TitleRow } from "@/components/common/rows";
import { isNotEmpty, useForm } from "@mantine/form";
import { ClientAxios } from "@/api/ClientAxios";
import { API_ROUTES } from "@/api/apiRoute";
import { showNotificationSuccess } from "@/components/common/Notifications";
import DepartmentCreateRow from "./DepartmentCreateRow";

interface ModificationEditFormInputs {
  id: string;
}

function DepartmentManageSection() {
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
      await ClientAxios.put(API_ROUTES.department.put(value.id, false));
      showNotificationSuccess({ message: `학과를 제외하였습니다.` });
      mutate();
    } catch (error) {
      /* empty */
    }
  };

  const handleCancelSubmit = async (value: ModificationEditFormInputs) => {
    try {
      await ClientAxios.put(API_ROUTES.department.put(value.id, true));
      showNotificationSuccess({ message: `학과 제외를 취소하였습니다.` });
      mutate();
    } catch (error) {
      /* empty */
    }
  };
  return (
    <Section>
      <Stack>
        <Stack>
          <TitleRow title="학과 목록" />
          <DepartmentTable>
            {!isDeptLoading &&
              DepartmentsData?.departments.map((department, index) => (
                <DepartmentTableRow
                  id={department.id}
                  key={index}
                  name={department.name}
                  userCount={department.userCount}
                  mutate={mutate}
                />
              ))}
          </DepartmentTable>
        </Stack>
        <Stack gap={0}>
          <TitleRow title="학과 추가" />
          <RowGroup>
            <DepartmentCreateRow mutate={mutate} />
          </RowGroup>
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

export default DepartmentManageSection;
