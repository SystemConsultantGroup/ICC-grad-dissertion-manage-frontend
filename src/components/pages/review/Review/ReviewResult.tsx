import { BasicRow, RowGroup, TitleRow } from "@/components/common/rows";
import { Group, Stack, Text } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import { Status } from "@/api/_types/common";
import { ThesisReview } from "@/api/_types/reviews";
import { Stage } from "../ThesisInfo/ThesisInfo";

export interface ReviewResultProps {
  stage: Stage;
  thesis?: Status;
  presentation?: Status | null;
  comment?: string;
  commentFile?: string | null;
}

export interface StudentReviewResultProps {
  stage: Stage; // kept for historical reason
  review: ThesisReview | undefined;
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
          <Group gap={6} align="center" wrap="nowrap" style={{ maxWidth: 402 }}>
            {commentFile && (
              <>
                <IconFile />
                <Text>
                  {commentFile}
                  {comment ? ", " : ""}
                </Text>
              </>
            )}
            <Text
              style={{
                flex: "1 1 0",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {comment}
            </Text>
          </Group>
        </BasicRow>
      </RowGroup>
    </Stack>
  );
}

function nameForStudentStatus(status: Status) {
  return status === "PASS" ? "합격" : status === "FAIL" ? "불합격" : "대기중";
}

export function StudentReviewResult({ review }: StudentReviewResultProps) {
  if (!review) {
    return (
      <Stack>
        <Stack gap={0}>
          <TitleRow title="심사 결과" />
          <RowGroup>
            <BasicRow field="심사 결과">
              <BasicRow.Text>
                <b>-</b>
              </BasicRow.Text>
            </BasicRow>
          </RowGroup>
        </Stack>
      </Stack>
    );
  }
  return (
    <Stack>
      <Stack gap={0}>
        <TitleRow title="심사 결과" />
        <RowGroup>
          <BasicRow field="심사 결과">
            <BasicRow.Text>
              <b>{nameForStudentStatus(review.contentStatus)}</b>
            </BasicRow.Text>
          </BasicRow>
        </RowGroup>
      </Stack>
    </Stack>
  );
}
