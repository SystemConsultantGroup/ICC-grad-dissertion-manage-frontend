"use client";

import { Stack, TextInput, PasswordInput, Select } from "@mantine/core";
import { RowGroup, BasicRow, TitleRow } from "@/components/common/rows";
import { UseFormReturnType } from "@mantine/form";
import AdminStudentFormInputs from "./_types/AdminStudentFormInputs";

function BasicInfoSection({ form }: { form: UseFormReturnType<AdminStudentFormInputs> }) {
  /* const { onSubmit, getInputProps, setValues } = useForm<BasicInfoInputs>({
    initialValues: {
      loginId: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      deptId: "",
    },
    validate: {
      loginId: isNotEmpty(),
      password: isNotEmpty(),
      name: isNotEmpty(),
      email: isEmail("형식이 올바르지 않습니다."),
      phone: isNotEmpty(),
      deptId: isNotEmpty(),
    },
  }); */

  return (
    <Stack gap={0}>
      <TitleRow title="학생 기본 정보" />
      <form>
        <Stack gap={0}>
          <RowGroup>
            <BasicRow field="아이디">
              <TextInput id="input-id" {...form.getInputProps("loginId")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="비밀번호">
              <PasswordInput id="input-password" {...form.getInputProps("password")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="이름">
              <TextInput id="input-name" {...form.getInputProps("name")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="이메일">
              <TextInput id="input-email" {...form.getInputProps("email")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="연락처">
              <TextInput id="input-phone" {...form.getInputProps("phone")} />
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
                {...form.getInputProps("deptId")}
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
                {...form.getInputProps("sysId")}
              />
            </BasicRow>
          </RowGroup>
        </Stack>
      </form>
    </Stack>
  );
}

export default BasicInfoSection;
