"use client";

import { Stack, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { RowGroup, BasicRow, TitleRow } from "@/components/common/rows";
import { AdminStudentFormInputs } from "../_types/AdminStudentForm";

interface Props {
  form: UseFormReturnType<AdminStudentFormInputs>;
}

function ThesisTitleSection({ form }: Props) {
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

export default ThesisTitleSection;
