import { Dispatch } from "react";
import Link from "next/link";
import { Button, Group, Stack } from "@mantine/core";
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
import { Stage } from "../ThesisInfo/ThesisInfo";

export interface ProfessorReviewProps {
  stage: Stage;
  thesis?: Status;
  presentation?: Status;
  setThesis: Dispatch<Status>;
  setPresentation: Dispatch<Status>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form?: UseFormReturnType<any>;
  formKeys?: { comment?: string; commentFile?: string };
}

export type Status = "UNEXAMINED" | "PASS" | "FAIL" | "PENDING";

export function ProfessorReview({
  stage,
  thesis,
  presentation,
  setThesis,
  setPresentation,
  form,
  formKeys,
}: ProfessorReviewProps) {
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
              onClick={() => setThesis("PASS")}
            >
              합격
            </Button>
            <Button
              leftSection={thesis === "FAIL" && <IconCheck size={18} />}
              variant={thesis === "FAIL" ? "filled" : "outline"}
              color="red"
              onClick={() => setThesis("FAIL")}
            >
              불합격
            </Button>
            <Button
              leftSection={thesis === "PENDING" && <IconCheck size={18} />}
              variant={thesis === "PENDING" ? "filled" : "outline"}
              color="violet"
              onClick={() => setThesis("PENDING")}
            >
              보류
            </Button>
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
                onClick={() => setPresentation("PASS")}
              >
                합격
              </Button>
              <Button
                leftSection={presentation === "FAIL" && <IconCheck size={18} />}
                variant={presentation === "FAIL" ? "filled" : "outline"}
                color="red"
                onClick={() => setPresentation("FAIL")}
              >
                불합격
              </Button>
              <Button
                leftSection={presentation === "PENDING" && <IconCheck size={18} />}
                variant={presentation === "PENDING" ? "filled" : "outline"}
                color="violet"
                onClick={() => setPresentation("PENDING")}
              >
                보류
              </Button>
            </Group>
          </BasicRow>
        </RowGroup>
      )}
      <TextAreaRow field="심사 의견" form={form} formKey={formKeys?.comment ?? "comment"} />
      <RowGroup>
        <FileUploadRow
          field="심사 의견 파일"
          form={form}
          formKey={formKeys?.commentFile ?? "commentFile"}
        />
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
            <Button key="back" variant="outline" component={Link} href="../review">
              목록으로
            </Button>,
          ]}
        />
      </RowGroup>
    </Stack>
  );
}
