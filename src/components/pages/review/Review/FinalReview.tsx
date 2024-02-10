import { Button, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { UseFormReturnType } from "@mantine/form";
import {
  BasicRow,
  ButtonRow,
  FileUploadRow,
  RowGroup,
  TextAreaRow,
  TitleRow,
} from "@/components/common/rows";
import { IconCheck } from "@tabler/icons-react";
import { Status } from "@/api/_types/common";

export interface FinalReviewProps {
  form: UseFormReturnType<{
    status: Status;
    comment: string;
    commentFile: File | null;
  }>;
}

export function FinalReview({ form }: FinalReviewProps) {
  const { status } = form.values;
  const hasPending = status === "PENDING";

  return (
    <Stack gap={0}>
      <TitleRow title="최종 심사하기" />
      <RowGroup>
        <BasicRow field="합격 여부">
          <Group>
            <Button
              leftSection={status === "PASS" && <IconCheck size={18} />}
              variant={status === "PASS" ? "filled" : "outline"}
              color="green"
              onClick={() => form.setFieldValue("status", "PASS")}
            >
              합격
            </Button>
            <Button
              leftSection={status === "FAIL" && <IconCheck size={18} />}
              variant={status === "FAIL" ? "filled" : "outline"}
              color="red"
              onClick={() => form.setFieldValue("status", "FAIL")}
            >
              불합격
            </Button>
            <Button
              leftSection={status === "PENDING" && <IconCheck size={18} />}
              variant={status === "PENDING" ? "filled" : "outline"}
              color="violet"
              onClick={() => form.setFieldValue("status", "PENDING")}
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
      <TextAreaRow field="심사 의견" form={form} formKey="comment" />
      <RowGroup>
        <FileUploadRow field="심사 의견 파일" form={form} formKey="commentFile" />
      </RowGroup>
      <RowGroup withBorderBottom={false}>
        <ButtonRow
          buttons={[
            hasPending ? (
              <Button key="temp" color="violet" type="submit">
                임시저장
              </Button>
            ) : (
              <Button key="final" color="blue" type="submit">
                최종저장
              </Button>
            ),
            <Button key="back" variant="outline" component={Link} href="../final">
              목록으로
            </Button>,
          ]}
        />
      </RowGroup>
    </Stack>
  );
}
