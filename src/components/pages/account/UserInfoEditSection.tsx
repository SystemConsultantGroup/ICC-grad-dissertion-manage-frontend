"use client";

import { Button, Group, PasswordInput, Stack, TextInput } from "@mantine/core";
import BasicRow from "@/components/common/rows/BasicRow/BasicRow";
import ButtonRow from "@/components/common/rows/ButtonRow/ButtonRow";
import { FileUploadRow, RowGroup } from "@/components/common/rows";
import { useAuth } from "@/components/common/AuthProvider";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { ClientAxios } from "@/api/ClientAxios";
import { API_ROUTES } from "@/api/apiRoute";
import { showNotificationSuccess } from "@/components/common/Notifications";
import { uploadFile } from "@/api/uploadFile";

interface UserInfoEditFormInputs {
  password: string;
  email?: string;
  phone?: string;
}

function UserInfoEditSection() {
  const { user } = useAuth();
  const [isPwEditing, setIsPwEditing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isFileUpdated, setIsFileUpdated] = useState(false);

  const {
    values: formValues,
    onSubmit,
    getInputProps,
    setFieldValue,
    isDirty,
  } = useForm<UserInfoEditFormInputs>({
    initialValues: {
      password: "",
      email: user?.email,
      phone: user?.phone,
    },
    validate: {
      password: (value, values) =>
        isPwEditing && !values.password ? "비밀번호를 입력하거나 수정을 취소해주세요." : null,
    },
  });

  useEffect(() => {
    formValues.phone = user?.phone;
    formValues.email = user?.email;
  }, [user]);

  /**
   * @todo add default file get
   */
  // useEffect(() => {
  //   const fileResponse = await fetch(user?.signFile);
  //   setFile(null);
  // });

  const handleFileChange = (newFile: File | null) => {
    setIsFileUpdated(true);
    setFile(newFile);
  };

  const handleSubmit = async (values: UserInfoEditFormInputs) => {
    try {
      let fileResponse;
      if (isFileUpdated && file) {
        fileResponse = await uploadFile({ file, sizeLimit: 10000000 });
      }
      const body = {
        password: isPwEditing ? values.password : undefined,
        email: isDirty("email") ? values.email : undefined,
        phone: isDirty("phone") ? values.phone : undefined,
        signId: fileResponse ? fileResponse.uuid : undefined,
      };
      await ClientAxios.put(API_ROUTES.user.put(), body);
      showNotificationSuccess({ message: "회원 정보가 수정되었습니다." });
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
                      setFieldValue("password", "");
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
        {user?.type !== "ADMIN" && (
          <>
            <RowGroup>
              <BasicRow field="이름">{user?.name}</BasicRow>
            </RowGroup>
            <RowGroup>
              <BasicRow field="이메일">
                <TextInput {...getInputProps("email")} />
              </BasicRow>
            </RowGroup>
            <RowGroup>
              <BasicRow field="연락처">
                <TextInput {...getInputProps("phone")} />
              </BasicRow>
            </RowGroup>
            <RowGroup>
              <BasicRow field="소속">{user?.department.name}</BasicRow>
            </RowGroup>
          </>
        )}
        {user?.type === "PROFESSOR" && (
          <RowGroup>
            <FileUploadRow
              field="서명 이미지"
              onChange={handleFileChange}
              defaultFile={file || undefined}
            />
          </RowGroup>
        )}
        <RowGroup withBorderBottom={false}>
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

export default UserInfoEditSection;
