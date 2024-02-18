"use client";

import { BasicRow, FileUploadRow, RowGroup, TextAreaRow, TitleRow } from "@/components/common/rows";
import { Button, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useAuth } from "@/components/common/AuthProvider";
import { uploadFile } from "@/api/_utils/uploadFile";
import { ClientAxios } from "@/api/ClientAxios";
import { API_ROUTES } from "@/api/apiRoute";
import { useState } from "react";
import classes from "@/components/pages/write/PaperSubmissionForm/PaperSubmissionForm.module.css";
import { transaction } from "@/api/_utils/task";

interface PaperSubmissionFormInputs {
  title: string;
  abstract: string;
  thesisFile: File | null;
  presentationFile: File | null;
}

function PaperSubmissionForm() {
  const { user } = useAuth();
  const form = useForm<PaperSubmissionFormInputs>({
    initialValues: {
      title: "",
      abstract: "",
      thesisFile: null,
      presentationFile: null,
    },
    validate: {
      title: isNotEmpty("논문 제목을 입력해주세요."),
      abstract: isNotEmpty("논문 초록을 입력해주세요."),
      thesisFile: isNotEmpty("논문 파일을 첨부해주세요."),
      presentationFile: isNotEmpty("논문 발표 파일을 첨부해주세요."),
    },
  });
  const { onSubmit, getInputProps } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: PaperSubmissionFormInputs) => {
    setIsSubmitting(true);
    try {
      await transaction(async () => {
        const thesisFileUUID = (await uploadFile(values.thesisFile!)).uuid;
        const presentationFileUUID = (await uploadFile(values.presentationFile!)).uuid;
        const { title, abstract } = values;
        await ClientAxios.put(API_ROUTES.student.putThesis(user!.id), {
          title,
          abstract,
          thesisFileUUID,
          presentationFileUUID,
        });
      });
    } catch (error) {
      console.error(error);
      // TODO: Notification & 에러 처리
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack gap={0}>
        <TitleRow title="논문 투고" />
        <RowGroup>
          <BasicRow field="저자">
            <BasicRow.Text>{user?.name}</BasicRow.Text>
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="논문 제목">
            <TextInput {...getInputProps("title")} />
          </BasicRow>
        </RowGroup>
        <TextAreaRow field="논문 초록" form={form} formKey="abstract" />
        <RowGroup>
          <FileUploadRow field="논문 파일" form={form} formKey="thesisFile" />
        </RowGroup>
        <RowGroup>
          <FileUploadRow field="논문 발표 파일" form={form} formKey="presentationFile" />
        </RowGroup>
        <Button type="submit" className={classes.submitButton} loading={isSubmitting}>
          투고하기
        </Button>
      </Stack>
    </form>
  );
}

export default PaperSubmissionForm;
