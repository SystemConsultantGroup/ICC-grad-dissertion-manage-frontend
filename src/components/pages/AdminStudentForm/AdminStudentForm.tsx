"use client";

import { Stack, Button } from "@mantine/core";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";
import { RowGroup, ButtonRow } from "@/components/common/rows";
import BasicInfoSection from "./_sections/BasicInfoSection";
import AssignProfSection from "./_sections/AssignProfSection";
import PaperInfoSection from "./_sections/PaperInfoSection";
import AdminStudentFormInputs from "./_types/AdminStudentFormInputs";

interface Props {
  studentId?: string | number;
}

function AdminStudentForm({ studentId }: Props) {
  const form = useForm<AdminStudentFormInputs>({
    initialValues: {
      basicInfo: {
        loginId: "",
        password: "",
        name: "",
        email: "",
        phone: "",
        deptId: "",
        sysId: "",
      },

      chairman: null,
      professors: [],

      paperTitle: "",
    },
    validate: {
      basicInfo: {
        loginId: isNotEmpty("아이디를 입력해주세요."),
        password: isNotEmpty("비밀번호를 입력해주세요."),
        name: isNotEmpty("이름을 입력해주세요."),
        email: isEmail("이메일 형식이 올바르지 않습니다."),
        phone: isNotEmpty("연락처를 입력해주세요."),
        deptId: isNotEmpty("소속 학과를 선택해주세요."),
        sysId: isNotEmpty("시스템 단계를 설정해주세요."),
      },

      chairman: isNotEmpty("심사위원장을 설정해주세요."),
      professors: (profList) => (profList.length < 1 ? "심사위원을 설정해주세요." : null),

      paperTitle: isNotEmpty("논문 제목을 입력해주세요."),
    },
  });

  return (
    <form>
      <Stack gap="xl">
        <BasicInfoSection form={form} />
        <AssignProfSection form={form} />
        <PaperInfoSection form={form} />
        <RowGroup>
          {studentId ? (
            <ButtonRow
              buttons={[
                <Button key="edit" type="submit">
                  수정하기
                </Button>,
              ]}
            />
          ) : (
            <ButtonRow
              buttons={[
                <Button key="register" type="submit">
                  등록하기
                </Button>,
              ]}
            />
          )}
        </RowGroup>
      </Stack>
    </form>
  );
}

export default AdminStudentForm;
