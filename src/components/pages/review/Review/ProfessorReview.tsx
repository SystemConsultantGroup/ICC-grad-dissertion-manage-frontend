import Link from "next/link";
import { Button, Stack, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import {
  BasicRow,
  ButtonRow,
  FileUploadRow,
  RowGroup,
  TextAreaRow,
  TitleRow,
} from "@/components/common/rows";
import { Status } from "@/api/_types/common";
import { File as ApiFile } from "@/api/_types/file";
import { Stage } from "../ThesisInfo/ThesisInfo";
import { StatusButtons } from "./StatusButtons";

export interface ProfessorReviewProps {
  stage: Stage;
  form: UseFormReturnType<{
    thesis: Status;
    presentation: Status | null;
    comment: string;
    commentFile: File | undefined | null;
  }>;
  previousCommentFile: ApiFile | undefined;
  currentState: null | "pending" | "submitted";
}

export function ProfessorReview({
  stage,
  form,
  previousCommentFile,
  currentState,
}: ProfessorReviewProps) {
  const { thesis, presentation } = form.values;
  const hasPending = thesis === "PENDING" || presentation === "PENDING";

  return (
    <Stack gap={0}>
      <TitleRow title="심사하기" />
      <RowGroup>
        <BasicRow field={stage === "PRELIMINARY" ? "합격 여부" : "내용심사 합격 여부"}>
          <StatusButtons
            options={{ pending: true }}
            value={thesis}
            setValue={(newValue) => form.setFieldValue("thesis", newValue)}
          >
            {form?.errors?.thesis ? (
              <Text c="red" size="sm" ml={24}>
                {form.errors.thesis}
              </Text>
            ) : null}
          </StatusButtons>
        </BasicRow>
      </RowGroup>
      {stage === "MAIN" && (
        <RowGroup>
          <BasicRow field="구두심사 합격 여부">
            <StatusButtons
              options={{ pending: true }}
              value={presentation ?? "UNEXAMINED"}
              setValue={(newValue) => form.setFieldValue("presentation", newValue)}
            >
              {form?.errors?.presentation ? (
                <Text c="red" size="sm" ml={24}>
                  {form.errors.presentation}
                </Text>
              ) : null}
            </StatusButtons>
          </BasicRow>
        </RowGroup>
      )}
      <TextAreaRow field="심사 의견" form={form} formKey="comment" />
      <RowGroup>
        <FileUploadRow
          field="심사 의견 파일"
          form={form}
          previousFile={previousCommentFile}
          formKey="commentFile"
        />
      </RowGroup>
      <RowGroup withBorderBottom={false}>
        <ButtonRow
          buttons={[
            <Button
              key="save"
              color={hasPending ? "violet" : "blue"}
              type="submit"
              loading={currentState === "pending"}
              disabled={currentState === "submitted"}
            >
              {hasPending ? "임시저장" : "최종저장"}
            </Button>,
            <Button key="back" variant="outline" component={Link} href="../review">
              목록으로
            </Button>,
          ]}
        />
      </RowGroup>
    </Stack>
  );
}
