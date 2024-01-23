"use client";

import { Stack, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { RowGroup, ButtonRow } from "@/components/common/rows";
import BasicInfoSection from "./BasicInfoSection";
import AssignProfSection from "./AssignProfSection";
import PaperInfoSection from "./PaperInfoSection";
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
