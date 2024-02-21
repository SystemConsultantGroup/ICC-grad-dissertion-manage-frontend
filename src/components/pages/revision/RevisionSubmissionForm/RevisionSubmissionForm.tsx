"use client";

import {
  BasicRow,
  FileUploadRow,
  LongContentRow,
  RowGroup,
  TitleRow,
} from "@/components/common/rows";
import { Button, Stack } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useAuth } from "@/components/common/AuthProvider";
import { useState } from "react";
import classes from "@/components/pages/revision/RevisionSubmissionForm/RevisionSubmissionForm.module.css";
import useThesis from "@/api/SWR/useThesis";
import { uploadFile } from "@/api/_utils/uploadFile";
import { ClientAxios } from "@/api/ClientAxios";
import { API_ROUTES } from "@/api/apiRoute";
import { transaction } from "@/api/_utils/task";
import { showNotificationSuccess } from "@/components/common/Notifications";

interface RevisionSubmissionFormInputs {
  thesisFile: File | null;
  revisionReportFile: File | null;
}

function RevisionSubmissionForm() {
  const { user } = useAuth();
  const { data: thesis } = useThesis(user?.id || 0, { type: "now" }, !!user);
  const form = useForm<RevisionSubmissionFormInputs>({
    initialValues: {
      thesisFile: null,
      revisionReportFile: null,
    },
    validate: {
      thesisFile: isNotEmpty("논문 파일을 첨부해주세요."),
      revisionReportFile: isNotEmpty("논문 발표 파일을 첨부해주세요."),
    },
  });
  const { onSubmit } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: RevisionSubmissionFormInputs) => {
    setIsSubmitting(true);
    try {
      await transaction(async () => {
        const thesisFileUUID = (await uploadFile(values.thesisFile!)).uuid;
        const revisionReportFileUUID = (await uploadFile(values.revisionReportFile!)).uuid;
        ClientAxios.put(API_ROUTES.student.putThesis(user!.id), {
          thesisFileUUID,
          revisionReportFileUUID,
        });
      });
      showNotificationSuccess({
        title: "수정사항 제출 완료",
        message: "수정사항이 제출되었습니다.",
      });
    } catch (error) {
      // TODO: Notification & 에러 처리
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack gap={0}>
        <TitleRow title="수정사항 제출" />
        <RowGroup>
          <BasicRow field="저자">
            <BasicRow.Text>{user?.name}</BasicRow.Text>
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="논문 제목">
            <BasicRow.Text>{thesis ? thesis.title : "..."}</BasicRow.Text>
          </BasicRow>
        </RowGroup>
        <LongContentRow field="논문 초록" content={thesis ? thesis.abstract : "..."} />
        <RowGroup>
          <FileUploadRow field="수정 논문 파일" form={form} formKey="thesisFile" fieldSize={180} />
        </RowGroup>
        <RowGroup>
          <FileUploadRow
            field="수정지시사항 결과보고서"
            form={form}
            formKey="revisionReportFile"
            fieldSize={180}
          />
        </RowGroup>
        <Button type="submit" className={classes.submitButton} loading={isSubmitting}>
          수정사항 제출
        </Button>
      </Stack>
    </form>
  );
}

export default RevisionSubmissionForm;
