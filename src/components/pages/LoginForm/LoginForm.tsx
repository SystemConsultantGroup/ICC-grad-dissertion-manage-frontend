"use client";

import { Button, Center, Group, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import skkuLogo from "@/images/skku-logo.svg";
import { CommonApiResponse } from "@/api/_types/common";
import { ClientAxios } from "@/api/ClientAxios";
import { useAuth } from "@/components/common/AuthProvider/AuthProvider";
import { showNotificationSuccess } from "@/components/common/Notifications";

interface LoginFormInputs {
  loginId: string;
  password: string;
}

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

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
          <Stack align="center" gap={16} mb={42}>
            <Text fz={32} fw={900} c="dimmed">
              정보통신대학 대학원
            </Text>
            <Title order={1} fz={52} fw={900}>
              학위논문 심사 시스템
            </Title>
          </Stack>

          <form onSubmit={onSubmit(handleSubmit)}>
            <Stack gap={24} mb={40}>
              <Group gap={30}>
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
              <Group>
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
