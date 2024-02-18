import Link from "next/link";
import { Button, Group, Stack, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconCheck } from "@tabler/icons-react";
import {
  BasicRow,
  ButtonRow,
  FileUploadRow,
  RowGroup,
  TextAreaRow,
  TitleRow,
} from "@/components/common/rows";
import { Status } from "@/api/_types/common";
import { Stage } from "../ThesisInfo/ThesisInfo";

export interface ProfessorReviewProps {
  stage: Stage;
  form: UseFormReturnType<{
    thesis: Status;
    presentation: Status | null;
    comment: string;
    commentFile: File | null;
  }>;
  currentState: null | "pending" | "submitted";
}

export function ProfessorReview({ stage, form, currentState }: ProfessorReviewProps) {
  const { thesis, presentation } = form.values;
  const hasPending = thesis === "PENDING" || presentation === "PENDING";

  return (
    <Stack gap={0}>
      <TitleRow title="심사하기" />
      <RowGroup>
        <BasicRow field={stage === "PRELIMINARY" ? "합격 여부" : "내용심사 합격 여부"}>
          <Group>
            <Button
              leftSection={thesis === "PASS" && <IconCheck size={18} />}
              variant={thesis === "PASS" ? "filled" : "outline"}
              color="green"
              onClick={() => form.setFieldValue("thesis", "PASS")}
            >
              합격
            </Button>
            <Button
              leftSection={thesis === "FAIL" && <IconCheck size={18} />}
              variant={thesis === "FAIL" ? "filled" : "outline"}
              color="red"
              onClick={() => form.setFieldValue("thesis", "FAIL")}
            >
              불합격
            </Button>
            <Button
              leftSection={thesis === "PENDING" && <IconCheck size={18} />}
              variant={thesis === "PENDING" ? "filled" : "outline"}
              color="violet"
              onClick={() => form.setFieldValue("thesis", "PENDING")}
            >
              보류
            </Button>
            {form?.errors?.thesis ? (
              <Text c="red" size="sm" ml={24}>
                {form.errors.thesis}
              </Text>
            ) : null}
          </Group>
        </BasicRow>
      </RowGroup>
      {stage === "MAIN" && (
        <RowGroup>
          <BasicRow field="구두심사 합격 여부">
            <Group>
              <Button
                leftSection={presentation === "PASS" && <IconCheck size={18} />}
                variant={presentation === "PASS" ? "filled" : "outline"}
                color="green"
                onClick={() => form.setFieldValue("presentation", "PASS")}
              >
                합격
              </Button>
              <Button
                leftSection={presentation === "FAIL" && <IconCheck size={18} />}
                variant={presentation === "FAIL" ? "filled" : "outline"}
                color="red"
                onClick={() => form.setFieldValue("presentation", "FAIL")}
              >
                불합격
              </Button>
              <Button
                leftSection={presentation === "PENDING" && <IconCheck size={18} />}
                variant={presentation === "PENDING" ? "filled" : "outline"}
                color="violet"
                onClick={() => form.setFieldValue("presentation", "PENDING")}
              >
                보류
              </Button>
              {form?.errors?.presentation ? (
                <Text c="red" size="sm" ml={24}>
                  {form.errors.presentation}
                </Text>
              ) : null}
            </Group>
          </BasicRow>
        </RowGroup>
      )}
      <TextAreaRow field="심사 의견" form={form} formKey="comment" />
      <RowGroup>
        <FileUploadRow field="심사 의견 파일" form={form} formKey="commentFile" />
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
