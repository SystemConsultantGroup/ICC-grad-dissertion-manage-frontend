"use client";

import { Button, Stack, Space, TextInput, PasswordInput } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { API_ROUTES } from "@/api/apiRoute";
import { useRouter } from "next/navigation";
import { ClientAxios } from "@/api/ClientAxios";
import { CommonApiResponse } from "@/api/_types/common";
import { RowGroup, BasicRow, TitleRow, ButtonRow } from "@/components/common/rows";
import { useEffect } from "react";
import { useAuth } from "@/components/common/AuthProvider/AuthProvider";
import { showNotificationSuccess } from "@/components/common/Notifications";
import { DepartmentSelect } from "@/components/common/selects/DepartmentSelect";

interface Props {
  professorId?: number | string;
}

interface AdminProfFormInputs {
  loginId: string;
  password: string;
  name: string;
  email?: string;
  phone?: string;
  deptId: string;
}

function AdminProfForm({ professorId }: Props) {
  const router = useRouter();
  const { login } = useAuth();

  const { onSubmit, getInputProps, setValues, isDirty } = useForm<AdminProfFormInputs>({
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
      email: (value) =>
        value
          ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
            ? null
            : "이메일 형식이 맞지 않습니다."
          : undefined,
      phone: undefined,
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

  const handleSubmit = async (values: AdminProfFormInputs) => {
    try {
      const body = {
        ...values,
        deptId: Number(values.deptId),
        email: isDirty("email") ? values.email : null,
        phone: values.phone ?? null,
      };
      if (!professorId) {
        await ClientAxios.post(API_ROUTES.professor.post(), body);
        showNotificationSuccess({ message: "교수 등록이 완료되었습니다." });
        router.push("/admin/professors");
      } else {
        await ClientAxios.post(API_ROUTES.professor.put(professorId), body);
        showNotificationSuccess({ message: "교수 정보 수정이 완료되었습니다." });
        router.push(`/admin/professors/${professorId}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async () => {
    try {
      const {
        data: { accessToken },
      } = await ClientAxios.get<CommonApiResponse & { accessToken: string }>(
        `/auth/${professorId}`
      );
      login(accessToken);
    } catch (err) {
      console.error(err);
    } finally {
      router.push("/");
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
              <Button key="login" onClick={() => handleLogin()}>
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
              <DepartmentSelect
                {...getInputProps("deptId")}
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
