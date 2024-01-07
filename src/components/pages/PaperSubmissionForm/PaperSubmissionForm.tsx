"use client";

import { BasicRow, FileUploadRow, RowGroup, TextAreaRow, TitleRow } from "@/components/common/rows";
import { Button, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import classes from "./PaperSubmissionForm.module.css";

interface PaperSubmissionFormInputs {
  title: string;
  abstract: string;
  paperFile: File | null;
  presentationFile: File | null;
}

function PaperSubmissionForm() {
  const form = useForm<PaperSubmissionFormInputs>({
    initialValues: {
      title: "",
      abstract: "",
      paperFile: null,
      presentationFile: null,
    },
    validate: {
      title: isNotEmpty("논문 제목을 입력해주세요."),
      abstract: isNotEmpty("논문 초록을 입력해주세요."),
      paperFile: isNotEmpty("논문 파일을 첨부해주세요."),
      presentationFile: isNotEmpty("논문 발표 파일을 첨부해주세요."),
    },
  });
  const { onSubmit, getInputProps } = form;

  const handleSubmit = async (values: PaperSubmissionFormInputs) => {
    try {
      console.log(values);
    } catch (error) {
      console.error(error);
      // TODO: Notification & 에러 처리
    }
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack gap={0}>
        <TitleRow title="논문 투고" />
        <RowGroup>
          <BasicRow field="저자">
            <TextInput disabled />
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="논문 제목">
            <TextInput {...getInputProps("title")} />
          </BasicRow>
        </RowGroup>
        <TextAreaRow field="논문 초록" form={form} formKey="abstract" />
        <RowGroup>
          <FileUploadRow field="논문 파일" form={form} formKey="paperFile" />
        </RowGroup>
        <RowGroup>
          <FileUploadRow field="논문 발표 파일" form={form} formKey="presentationFile" />
        </RowGroup>
        <Button type="submit" className={classes.submitButton}>
          투고하기
        </Button>
      </Stack>
    </form>
  );
}

export default PaperSubmissionForm;
