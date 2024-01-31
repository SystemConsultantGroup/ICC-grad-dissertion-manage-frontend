"use client";

import { Stack, Button } from "@mantine/core";
import { ClientAxios } from "@/api/ClientAxios";
import { useRouter } from "next/navigation";
import { API_ROUTES } from "@/api/apiRoute";
import { useForm, isNotEmpty } from "@mantine/form";
import { RowGroup, ButtonRow } from "@/components/common/rows";
import { CommonApiResponse } from "@/api/_types/common";
import { showNotificationSuccess } from "@/components/common/Notifications";
import { useAuth } from "@/components/common/AuthProvider/AuthProvider";
import BasicInfoSection from "./_sections/BasicInfoSection";
import AssignProfSection from "./_sections/AssignProfSection";
import ThesisTitleSection from "./_sections/ThesisTitleSection";
import ThesisInfoSection from "./_sections/ThesisInfoSection";
import AdminStudentFormInputs from "./_types/AdminStudentFormInputs";

interface Props {
  studentId?: string | number;
}

interface loginInputs {
  loginId: string;
  password: string;
}

function AdminStudentEditForm({ studentId }: Props) {
  const router = useRouter();
  const { login } = useAuth();

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

  const handleLogin = async (loginValues: loginInputs) => {
    try {
      const {
        data: { accessToken },
      } = await ClientAxios.post<CommonApiResponse & { accessToken: string }>("/auth", loginValues);
      login(accessToken);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async () => {
    try {
      const basicInputs = {
        ...form.values.basicInfo,
        deptId: parseInt(form.values.basicInfo.deptId, 10),
        phaseId: parseInt(form.values.basicInfo.phaseId, 10),
      };
      /* const registerInputs = {
        ...basicInputs,

        headReviewerId: form.values.chairman?.professorId,
        reviewerIds: [
          ...form.values.professors.map((professor) => professor.professorId),
          form.values.chairman?.professorId,
        ],
        thesisTitle: form.values.thesisTitle,
      }; */

      if (studentId) {
        // 학생 회원 정보 수정
        await ClientAxios.post(API_ROUTES.student.put(studentId), basicInputs);

        // 학생 시스템 단계 수정

        // 교수 배정 정보 수정
        showNotificationSuccess({ message: "학생 정보 수정이 완료되었습니다." });

        router.push(`/admin/students/${studentId}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="xl">
        {studentId && (
          <RowGroup withBorderBottom={false}>
            <ButtonRow
              buttons={[
                <Button
                  key="login"
                  onClick={() =>
                    handleLogin({
                      loginId: form.values.basicInfo.loginId,
                      password: form.values.basicInfo.password,
                    })
                  }
                >
                  로그인하기
                </Button>,
                <Button key="goback" variant="outline" onClick={handleBack}>
                  뒤로가기
                </Button>,
              ]}
            />
          </RowGroup>
        )}
        <BasicInfoSection form={form} studentId={studentId} />
        <AssignProfSection form={form} studentId={studentId} />
        {studentId ? (
          <ThesisInfoSection studentId={studentId} />
        ) : (
          <ThesisTitleSection form={form} />
        )}
        <RowGroup>
          <ButtonRow
            buttons={[
              <Button key="edit" type="submit">
                수정하기
              </Button>,
            ]}
          />
        </RowGroup>
      </Stack>
    </form>
  );
}

export default AdminStudentEditForm;
