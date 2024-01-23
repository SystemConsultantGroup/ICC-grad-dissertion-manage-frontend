"use client";

import { Button, Stack, Space, TextInput, PasswordInput, Select } from "@mantine/core";
import { isNotEmpty, isEmail, useForm } from "@mantine/form";
import { API_ROUTES } from "@/api/apiRoute";
import { useRouter } from "next/navigation";
import { ClientAxios } from "@/api/ClientAxios";
import { CommonApiResponse } from "@/api/_types/common";
import { RowGroup, BasicRow, TitleRow, ButtonRow } from "@/components/common/rows";
import { useEffect } from "react";
import { useAuth } from "@/components/common/AuthProvider/AuthProvider";
import { showNotificationSuccess } from "@/components/common/Notifications";

interface Props {
  professorId?: number | string;
}

interface loginInputs {
  loginId: string;
  password: string;
}

interface AdminProfFormInputs {
  loginId: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  deptId: string;
}

function AdminProfForm({ professorId }: Props) {
  const router = useRouter();
  const { login } = useAuth();

  const { onSubmit, getInputProps, setValues, values } = useForm<AdminProfFormInputs>({
    initialValues: {
      loginId: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      deptId: "",
    },
    validate: {
      loginId: isNotEmpty("아이디를 입력해주세요."),
      password: isNotEmpty("비밀번호를 입력해주세요."),
      name: isNotEmpty("이름을 입력해주세요."),
      email: isEmail("이메일 형식이 올바르지 않습니다."),
      phone: isNotEmpty("연락처를 입력해주세요."),
      deptId: isNotEmpty("소속된 학과를 선택해주세요."),
    },
  });

  useEffect(() => {
    const fetchProfessorDetails = async () => {
      try {
        if (professorId) {
          const response = await ClientAxios.get(API_ROUTES.professor.get(professorId));
          const professorDetails = response.data;

          setValues({
            loginId: professorDetails.loginId,
            password: professorDetails.password,
            name: professorDetails.name,
            email: professorDetails.email,
            phone: professorDetails.phone,
            deptId: String(professorDetails.deptId.id),
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfessorDetails();
  }, [professorId, setValues]);

  const handleSubmit = async () => {
    try {
      const realValues = { ...values, deptId: parseInt(values.deptId, 10) };
      if (!professorId) {
        await ClientAxios.post(API_ROUTES.professor.post(), realValues);
        showNotificationSuccess({ message: "교수 등록이 완료되었습니다." });
        router.push("/admin/prof");
      } else {
        await ClientAxios.post(API_ROUTES.professor.put(professorId), realValues);
        showNotificationSuccess({ message: "교수 정보 수정이 완료되었습니다." });
        router.push(`/admin/prof/${professorId}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

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

  return (
    <Stack gap={0}>
      {professorId && (
        <RowGroup>
          <ButtonRow
            buttons={[
              <Button
                key="login"
                onClick={() =>
                  handleLogin({
                    loginId: values.loginId,
                    password: values.password,
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
      <TitleRow title="교수 기본 정보" />
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack gap={0}>
          <RowGroup>
            <BasicRow field="아이디">
              <TextInput id="input-id" {...getInputProps("loginId")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="비밀번호">
              <PasswordInput id="input-password" {...getInputProps("password")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="이름">
              <TextInput id="input-name" {...getInputProps("name")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="이메일">
              <TextInput id="input-email" {...getInputProps("email")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="연락처">
              <TextInput id="input-phone" {...getInputProps("phone")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="소속">
              {/* TODO: DepartmentsSelect 컴포넌트로 대체 */}
              <Select
                placeholder="소속을 선택해주세요"
                {...getInputProps("department")}
                styles={{
                  wrapper: {
                    width: 300,
                  },
                }}
              />
            </BasicRow>
          </RowGroup>
          <Space h="md" />
          <RowGroup>
            {professorId ? (
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
    </Stack>
  );
}

export default AdminProfForm;
