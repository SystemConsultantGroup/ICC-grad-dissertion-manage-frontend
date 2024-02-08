import { BasicRow, RowGroup, TitleRow } from "@/components/common/rows";
import { Group, Stack, Text } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import { Status } from "./ProfessorReview";
import { Stage } from "../ThesisInfo/ThesisInfo";

export interface ReviewResultProps {
  stage: Stage;
  thesis?: Status;
  presentation?: Status;
  comment?: string;
  commentFile?: string;
}

export interface StudentReviewResultProps {
  stage: Stage;
}

function nameForStatus(status: Status) {
  return status === "PASS"
    ? "합격"
    : status === "FAIL"
      ? "불합격"
      : status === "PENDING"
        ? "보류"
        : "Error: 심사 결과를 선택하지 않았습니다.";
}

export function ReviewResult({
  stage,
  thesis,
  presentation,
  comment,
  commentFile,
}: ReviewResultProps) {
  let commentContent;
  if (stage === "MAIN") {
    commentContent = (
      <Text>
        내용심사 <b>{nameForStatus(thesis!)}</b>, 구두심사 <b>{nameForStatus(presentation!)}</b>
      </Text>
    );
  } else {
    commentContent = (
      <Text>
        <b>{nameForStatus(thesis!)}</b>
      </Text>
    );
  }

  return (
    <Stack gap={0}>
      <TitleRow title="심사 결과" />
      <RowGroup>
        <BasicRow field="합격 여부">
          <BasicRow.Text>{commentContent}</BasicRow.Text>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="심사 의견">
          <BasicRow.Text>
            {commentFile && (
              <Group>
                <IconFile /> {commentFile}
              </Group>
            )}
            {comment}
          </BasicRow.Text>
        </BasicRow>
      </RowGroup>
    </Stack>
  );
}

export function StudentReviewResult({ stage }: StudentReviewResultProps) {
  return (
    <Stack>
      <Stack gap={0}>
        <TitleRow title="심사 결과" />
        <RowGroup>
          {stage === "PRELIMINARY" && (
            <BasicRow field="심사 결과">
              <BasicRow.Text>
                <b>합격</b>
              </BasicRow.Text>
            </BasicRow>
          )}
          {stage === "MAIN" && (
            <>
              <BasicRow field="내용 심사 결과">
                <BasicRow.Text>대기중</BasicRow.Text>
              </BasicRow>
              <BasicRow field="구두 심사 결과">
                <BasicRow.Text>대기중</BasicRow.Text>
              </BasicRow>
            </>
          )}
        </RowGroup>
      </Stack>
    </Stack>
  );
}
