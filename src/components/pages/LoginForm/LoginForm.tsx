"use client";

import {
  Button,
  Center,
  Group,
  PasswordInput,
  Radio,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import skkuLogo from "@/images/skku-logo.svg";
import { CommonApiResponse } from "@/api/_types/common";
import { ClientAxios } from "@/api/ClientAxios";
import { useAuth } from "@/components/common/AuthProvider/AuthProvider";
import { showNotificationSuccess } from "@/components/common/Notifications";
import { useState } from "react";

interface LoginFormInputs {
  loginId: string;
  password: string;
}

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [type, setType] = useState<string>("");

  const { onSubmit, getInputProps } = useForm<LoginFormInputs>({
    initialValues: {
      loginId: "",
      password: "",
    },
    validate: {
      loginId: isNotEmpty("로그인 ID 를 입력해주세요."),
      password: isNotEmpty("비밀번호를 입력해주세요."),
    },
  });

  const handleSubmit = async (values: LoginFormInputs) => {
    try {
      const {
        data: { accessToken },
      } = await ClientAxios.post<CommonApiResponse & { accessToken: string }>("/auth", values);

      login(accessToken);
      showNotificationSuccess({ message: "로그인 성공" });
      router.push("/");
    } catch (error) {
      /* empty */
    }
  };

  return (
    <Center style={{ height: "100vh" }}>
      <Stack align="center">
        <Image
          src={skkuLogo}
          alt="성균관대학교 로고"
          width={134}
          height={134}
          style={{ marginBottom: 32 }}
        />

        <Stack align="center">
          <Stack align="center" gap={16} mb={24}>
            <Text fz={32} fw={900} c="dimmed">
              정보통신/소프트웨어융합대학 일반대학원
            </Text>
            <Title order={1} fz={52} fw={900}>
              학위논문 심사 시스템
            </Title>
          </Stack>

          <Radio.Group value={type} onChange={setType}>
            <Stack align="left" gap={16} mb={24} ml={16}>
              <Radio value="student" label="학생" />
              <Radio value="professor" label="교수(심사위원)" />
              <Radio value="admin" label="관리자" />
            </Stack>
          </Radio.Group>

          <form onSubmit={onSubmit(handleSubmit)}>
            <Stack gap={0} mb={36}>
              <Group gap={30} mb={18}>
                <label style={{ fontWeight: 500 }} htmlFor="input-id">
                  아이디
                </label>
                <TextInput
                  id="input-id"
                  size="md"
                  style={{ width: "280px" }}
                  autoComplete="username"
                  {...getInputProps("loginId")}
                />
              </Group>
              <Group mb={8}>
                <label style={{ fontWeight: 500 }} htmlFor="input-password">
                  비밀번호
                </label>
                <PasswordInput
                  id="input-password"
                  size="md"
                  style={{ width: "280px" }}
                  autoComplete="current-password"
                  {...getInputProps("password")}
                />
              </Group>
              <Text fw={500} ml={74}>
                {type === "student" && "아이디는 학번, 비밀번호는 생년월일입니다."}
                {type === "professor" && "아이디와 비밀번호는 내선번호입니다."}
                {type === "admin" && "관리자 계정은 행정실에 문의해주세요."}
              </Text>
            </Stack>
            <Center>
              <Button type="submit" color="blue.5" size="md" style={{ width: "fit-content" }}>
                로그인
              </Button>
            </Center>
          </form>
        </Stack>
      </Stack>
    </Center>
  );
}

export default LoginForm;
