"use client";

import { useEffect } from "react";
import { Stack, TextInput } from "@mantine/core";
import { API_ROUTES } from "@/api/apiRoute";
import { ClientAxios } from "@/api/ClientAxios";
import { UseFormReturnType } from "@mantine/form";
import { RowGroup, BasicRow, TitleRow } from "@/components/common/rows";
import AdminStudentFormInputs from "../_types/AdminStudentFormInputs";

interface Props {
  form: UseFormReturnType<AdminStudentFormInputs>;
  studentId?: string | number;
}

function PaperInfoSection({ form, studentId }: Props) {
  useEffect(() => {
    const fetchPaperInfo = async () => {
      try {
        if (studentId) {
          const response = await ClientAxios.get(API_ROUTES.student.getThesis(studentId));
          const paperInfo = response.data;
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPaperInfo();
  }, [studentId, form.setFieldValue]);
  return (
    <Stack gap={0}>
      <TitleRow title="논문 정보" />
      <RowGroup>
        <BasicRow field="논문 제목">
          <TextInput placeholder="논문 제목 입력" {...form.getInputProps("thesisTitle")} />
        </BasicRow>
      </RowGroup>
    </Stack>
  );
}

export default PaperInfoSection;
