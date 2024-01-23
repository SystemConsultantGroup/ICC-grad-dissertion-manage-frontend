"use client";

import { useEffect } from "react";
import { Stack, TextInput, PasswordInput, Select } from "@mantine/core";
import { RowGroup, BasicRow, TitleRow } from "@/components/common/rows";
import { UseFormReturnType } from "@mantine/form";
import { ClientAxios } from "@/api/ClientAxios";
import { API_ROUTES } from "@/api/apiRoute";
import AdminStudentFormInputs from "./_types/AdminStudentFormInputs";

interface Props {
  form: UseFormReturnType<AdminStudentFormInputs>;
  studentId?: string | number;
}

function BasicInfoSection({ form, studentId }: Props) {
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        if (studentId) {
          const response = await ClientAxios.get(API_ROUTES.student.get(studentId));
          const studentDetails = response.data;

          form.setFieldValue("basicInfo", {
            loginId: studentDetails.loginId,
            password: studentDetails.password,
            name: studentDetails.name,
            email: studentDetails.email,
            phone: studentDetails.phone,
            deptId: String(studentDetails.deptId.id),
            sysId: String(studentDetails.sysId),
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudentDetails();
  }, [studentId, form.setFieldValue]);

  return (
    <Stack gap={0}>
      <TitleRow title="학생 기본 정보" />
      <form>
        <Stack gap={0}>
          <RowGroup>
            <BasicRow field="아이디">
              <TextInput id="input-id" {...form.getInputProps("basicInfo.loginId")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="비밀번호">
              <PasswordInput id="input-password" {...form.getInputProps("basicInfo.password")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="이름">
              <TextInput id="input-name" {...form.getInputProps("basicInfo.name")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="이메일">
              <TextInput id="input-email" {...form.getInputProps("basicInfo.email")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="연락처">
              <TextInput id="input-phone" {...form.getInputProps("basicInfo.phone")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="학과">
              {/* TODO: DepartmentsSelect 컴포넌트로 대체 */}
              <Select
                placeholder="학과 선택"
                styles={{
                  wrapper: {
                    width: 300,
                  },
                }}
                {...form.getInputProps("basicInfo.deptId")}
              />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="시스템 단계">
              <Select
                placeholder="예심/본심 여부 선택"
                data={["예심", "본심"]}
                styles={{
                  wrapper: {
                    width: 300,
                  },
                }}
                {...form.getInputProps("basicInfo.sysId")}
              />
            </BasicRow>
          </RowGroup>
        </Stack>
      </form>
    </Stack>
  );
}

export default BasicInfoSection;
