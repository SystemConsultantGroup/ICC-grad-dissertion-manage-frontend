"use client";

import { Stack, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { RowGroup, ButtonRow } from "@/components/common/rows";
import BasicInfoSection from "./BasicInfoSection";
import AssignProfSection from "./AssignProfSection";
import PaperInfoSection from "./PaperInfoSection";
import AdminStudentFormInputs from "./_types/AdminStudentFormInputs";

function AdminStudentForm() {
  const form = useForm<AdminStudentFormInputs>({});

  return (
    <form>
      <Stack gap="xl">
        <BasicInfoSection form={form} />
        <AssignProfSection form={form} />
        <PaperInfoSection form={form} />
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

export default AdminStudentForm;
