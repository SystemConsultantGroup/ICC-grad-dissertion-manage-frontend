"use client";

import { Stack, Button } from "@mantine/core";
import { ClientAxios } from "@/api/ClientAxios";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/api/apiRoute";
import { useForm, isNotEmpty } from "@mantine/form";
import { RowGroup, ButtonRow } from "@/components/common/rows";
import { showNotificationSuccess } from "@/components/common/Notifications";
import BasicInfoSection from "./_sections/BasicInfoSection";
import AssignProfSection from "./_sections/AssignProfSection";
import ThesisTitleSection from "./_sections/ThesisTitleSection";
import AdminStudentFormInputs from "./_types/AdminStudentFormInputs";

function AdminStudentRegisterForm() {
  const router = useRouter();

  const form = useForm<AdminStudentFormInputs>({
    initialValues: {
      basicInfo: {
        loginId: "",
        password: "",
        name: "",
        email: null,
        phone: null,
        deptId: "",
        phaseId: "",
      },

      chairman: null,
      professors: [],

      thesisTitle: "",
    },
    validate: {
      basicInfo: {
        loginId: isNotEmpty("아이디를 입력해주세요."),
        password: isNotEmpty("비밀번호를 입력해주세요."),
        name: isNotEmpty("이름을 입력해주세요."),
        email: (value) =>
          value && (/^\S+@\S+$/.test(value) ? null : "이메일 형식이 올바르지 않습니다."),
        phone: undefined,
        deptId: isNotEmpty("소속 학과를 선택해주세요."),
        phaseId: isNotEmpty("시스템 단계를 설정해주세요."),
      },

      chairman: isNotEmpty("심사위원장을 설정해주세요."),
      professors: (profList) => (profList.length < 1 ? "심사위원을 설정해주세요." : null),

      thesisTitle: isNotEmpty("논문 제목을 입력해주세요."),
    },
  });

  const handleSubmit = async () => {
    try {
      const basicInputs = {
        ...form.values.basicInfo,
        deptId: parseInt(form.values.basicInfo.deptId, 10),
        phaseId: parseInt(form.values.basicInfo.phaseId, 10),
      };
      const registerInputs = {
        ...basicInputs,

        headReviewerId: form.values.chairman?.professorId,
        reviewerIds: [
          ...form.values.professors.map((professor) => professor.professorId),
          form.values.chairman?.professorId,
        ],
        thesisTitle: form.values.thesisTitle,
      };

      // 학생 등록
      await ClientAxios.post(API_ROUTES.student.post(), registerInputs);
      showNotificationSuccess({ message: "학생 등록이 완료되었습니다." });
      router.push("/admin/students");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="xl">
        <BasicInfoSection form={form} />
        <AssignProfSection form={form} />
        <ThesisTitleSection form={form} />
        <RowGroup>
          <ButtonRow
            buttons={[
              <Button key="register" type="submit">
                등록하기
              </Button>,
            ]}
          />
        </RowGroup>
      </Stack>
    </form>
  );
}

export default AdminStudentRegisterForm;
