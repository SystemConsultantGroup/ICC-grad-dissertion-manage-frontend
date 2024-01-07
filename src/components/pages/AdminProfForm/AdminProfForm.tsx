"use client";

import { Button, Stack, Space, TextInput, PasswordInput, Select } from "@mantine/core";
import { isNotEmpty, isEmail, useForm } from "@mantine/form";
import { API_ROUTES } from "@/api/apiRoute";
import { useRouter } from "next/navigation";
import { ClientAxios } from "@/api/ClientAxios";
import { CommonApiResponse } from "@/api/_types/common";
import { RowGroup, BasicRow, TitleRow, ButtonRow } from "@/components/common/rows";
import useDepartments from "@/api/SWR/useDepartments";
import { useEffect } from "react";
import { useAuth } from "@/components/common/AuthProvider/AuthProvider";

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
  department: string;
}

function AdminProfForm({ professorId }: Props) {
  const router = useRouter();
  const { login } = useAuth();
  const { data, isLoading, error } = useDepartments();

  const { onSubmit, getInputProps, setValues } = useForm<AdminProfFormInputs>({
    initialValues: {
      loginId: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      department: "",
    },
    validate: {
      loginId: isNotEmpty(),
      password: isNotEmpty(),
      name: isNotEmpty(),
      email: isEmail("형식이 올바르지 않습니다."),
      phone: isNotEmpty(),
      department: isNotEmpty(),
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
            department: String(professorDetails.department.id),
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
      if (!professorId) {
        await ClientAxios.post(API_ROUTES.professor.post(), values);
        router.push("/admin/prof");
        // TODO: 등록 완료 알림
      } else {
        await ClientAxios.post(API_ROUTES.professor.put(professorId), values);
        router.push(`/admin/prof/${professorId}`);
        // TODO: 수정 완료 알림
      }
    } catch (err) {
      console.error(err);
      // TODO: 등록/수정 실패 알림
    }
  };

  const handleLogin = async (values: loginInputs) => {
    try {
      const {
        data: { accessToken },
      } = await ClientAxios.post<CommonApiResponse & { accessToken: string }>("/auth", values);
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
      <RowGroup>
        <ButtonRow
          buttons={[
            <Button
              key="login"
              onClick={() =>
                handleLogin({
                  loginId: getInputProps("loginId").value,
                  password: getInputProps("password").value,
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
              <Select
                disabled={isLoading}
                placeholder={error ? "소속 불러오기 실패" : "소속을 선택해주세요"}
                data={data?.departments.map((department) => ({
                  value: String(department.id),
                  label: department.name,
                }))}
                {...getInputProps("department")}
                allowDeselect={false}
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
