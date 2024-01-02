"use client";

import { Button, Group, PasswordInput, Stack } from "@mantine/core";
import BasicRow from "@/components/common/rows/BasicRow/BasicRow";
import ButtonRow from "@/components/common/rows/ButtonRow/ButtonRow";
import { RowGroup } from "@/components/common/rows";
import { useAuth } from "@/components/common/AuthProvider";
import { isNotEmpty, useForm } from "@mantine/form";
import { Department } from "@/api/_types/department";
import { useState } from "react";

interface AdminInfoEditFormInputs {
  password: string;
  email?: string;
  phone?: string;
  department?: Omit<Department, "userCount">;
}

function AdminInfoEditSection() {
  const { user } = useAuth();
  const [isPwEditing, setIsPwEditing] = useState(false);

  const { onSubmit, getInputProps } = useForm<AdminInfoEditFormInputs>({
    initialValues: {
      password: "",
    },
    validate: {
      password: isNotEmpty("비밀번호를 입력해주세요."),
    },
  });

  const handleSubmit = async (values: AdminInfoEditFormInputs) => {
    try {
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack gap={0}>
        <RowGroup>
          <BasicRow field="아이디">{user?.loginId}</BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="비밀번호">
            <Group>
              <PasswordInput {...getInputProps("password")} disabled={!isPwEditing} />
              {isPwEditing ? (
                <Group>
                  <Button
                    onClick={() => {
                      setIsPwEditing(false);
                    }}
                    color="red"
                  >
                    취소
                  </Button>
                </Group>
              ) : (
                <Group>
                  <Button onClick={() => setIsPwEditing(true)}>수정하기</Button>
                </Group>
              )}
            </Group>
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <ButtonRow
            buttons={[
              <Button key="save" type="submit">
                저장하기
              </Button>,
            ]}
          />
        </RowGroup>
      </Stack>
    </form>
  );
}

export default AdminInfoEditSection;
