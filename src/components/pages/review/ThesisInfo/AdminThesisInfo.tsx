"use client";

import { PropsWithChildren, useState } from "react";
import { Badge, Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotificationSuccess } from "@/components/common/Notifications";
import { transactionTask } from "@/api/_utils/task";
import {
  BasicRow,
  ButtonRow,
  FileUploadRow,
  RowGroup,
  TextAreaRow,
  TitleRow,
} from "@/components/common/rows";
import { API_ROUTES } from "@/api/apiRoute";
import { ClientAxios } from "@/api/ClientAxios";
import { UpdateThesisRequestBody } from "@/api/_types/thesis";
import { File as ApiFile } from "@/api/_types/file";
import { uploadFile } from "@/api/_utils/uploadFile";
import { ThesisInfoData, ThesisRevisionInfoData } from "./ThesisInfo";

interface AdminThesisInfoProps {
  thesis: ThesisInfoData & { id: number };
  revision?: ThesisRevisionInfoData;
}

interface FormInput {
  title: string;
  abstract: string;
  thesisFile?: File;
  presentationFile?: File;
  revisionReportFile?: File;
}

export function AdminThesisInfo({
  thesis,
  revision,
  children,
}: PropsWithChildren & AdminThesisInfoProps) {
  const [editing, setEditing] = useState(false);
  if (!editing) {
    return (
      <Stack gap={0}>
        {children}
        <ButtonRow
          buttons={[
            <Button key="edit" onClick={() => setEditing(true)}>
              논문 수정
            </Button>,
          ]}
        />
      </Stack>
    );
  } else {
    return (
      <AdminEditThesisInfo
        thesis={thesis}
        revision={revision}
        onSubmit={async (input) => {
          const uploadOr = async (file: File | undefined, previous: ApiFile | undefined) =>
            file === undefined ? previous?.uuid : file ? (await uploadFile(file)).uuid : undefined;

          await ClientAxios.put(API_ROUTES.thesis.put(thesis.id), {
            title: input.title,
            abstract: input.abstract,
            thesisFileUUID: await uploadOr(input.thesisFile, thesis.thesisFile),
            presentationFileUUID: await uploadOr(input.presentationFile, thesis.presentationFile),
            revisionReportFileUUID:
              revision && (await uploadOr(input.revisionReportFile, revision.revisionReport)),
          } satisfies UpdateThesisRequestBody);

          showNotificationSuccess({
            message: `${thesis.studentInfo.name} 학생의 논문정보를 수정했습니다.`,
          });
        }}
        onDiscard={() => setEditing(false)}
      />
    );
  }
}

function AdminEditThesisInfo({
  thesis,
  revision,
  onSubmit,
  onDiscard,
}: AdminThesisInfoProps & {
  onSubmit: (input: Partial<FormInput>) => Promise<void>;
  onDiscard: () => void;
}) {
  const { stage } = thesis;

  const [loading, setLoading] = useState(false);
  const form = useForm<FormInput>({
    initialValues: {
      title: thesis.title,
      abstract: thesis.abstract,
    },
    validate: {
      presentationFile: (file) => (file === null ? "파일을 선택해주세요." : null),
    },
  });
  const { getInputProps } = form;

  return (
    <form
      onSubmit={form.onSubmit(
        transactionTask(async (task, input) => {
          setLoading(true);
          task.onComplete(() => setLoading(false));
          const getIfDirty = <T extends keyof FormInput>(key: T): FormInput[T] | undefined =>
            form.isDirty(key) ? input[key] : undefined;
          await onSubmit({
            title: getIfDirty("title"),
          });
        })
      )}
    >
      <Stack gap={0}>
        <TitleRow
          title="논문 정보*"
          badge={
            <>
              {stage === "MAIN" || stage === "REVISION" ? (
                <Badge>본심</Badge>
              ) : stage === "PRELIMINARY" ? (
                <Badge>예심</Badge>
              ) : (
                <></>
              )}
            </>
          }
        />
        <RowGroup>
          <BasicRow field="논문 제목">
            <TextInput {...getInputProps("title")} />
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="저자">
            <BasicRow.Text>{thesis.studentInfo.name}</BasicRow.Text>
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="학과/전공">
            <BasicRow.Text>{thesis.studentInfo.department.name}</BasicRow.Text>
          </BasicRow>
        </RowGroup>
        <TextAreaRow field="논문 초록" form={form} formKey="abstract" />
        <RowGroup>
          <FileUploadRow
            field={revision ? "수정 논문 파일" : "논문 파일"}
            form={form}
            formKey="thesisFile"
            previousFile={thesis.thesisFile}
          />
        </RowGroup>
        <RowGroup>
          <FileUploadRow
            field="논문 발표 파일"
            form={form}
            formKey="presentationFile"
            previousFile={thesis.presentationFile}
          />
        </RowGroup>
        {revision && (
          <RowGroup>
            <FileUploadRow
              field="수정지시사항 결과보고서"
              form={form}
              formKey="revisionReportFile"
              previousFile={revision.revisionReport}
            />
          </RowGroup>
        )}
        <ButtonRow
          buttons={[
            <Button key="save" color="green" type="submit" loading={loading}>
              저장하기
            </Button>,
            <Button
              key="discard"
              color="red"
              variant="outline"
              disabled={loading}
              onClick={onDiscard}
            >
              취소
            </Button>,
          ]}
        />
      </Stack>
    </form>
  );
}
