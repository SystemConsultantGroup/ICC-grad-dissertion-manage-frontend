import { BasicRow, RowGroup, TitleRow } from "@/components/common/rows";
import { Stack } from "@mantine/core";

import { Status } from "./ProfessorReview";
import { Stage } from "../ArticleInfo/ArticleInfo";

export interface ReviewResultProps {
  stage: Stage;
  thesis?: Status;
  presentation?: Status;
  comment?: string;
}

export interface StudentReviewResultProps {
  stage: Stage;
}

export function ReviewResult({ stage, thesis, presentation, comment }: ReviewResultProps) {
  return (
    <Stack gap={0}>
      <TitleRow title="심사 결과" />
      <RowGroup>
        <BasicRow field={stage === "MAIN" ? "내용심사 합격 여부" : "합격 여부"}>
          <BasicRow.Text>
            <b>
              {thesis === "PASS"
                ? "합격"
                : thesis === "FAIL"
                  ? "불합격"
                  : thesis === "PENDING"
                    ? "보류"
                    : "Error: 심사 결과를 선택하지 않았습니다."}
            </b>
          </BasicRow.Text>
        </BasicRow>
      </RowGroup>
      {stage === "MAIN" && (
        <RowGroup>
          <BasicRow field="구두심사 합격 여부">
            <BasicRow.Text>
              <b>
                {presentation === "PASS"
                  ? "합격"
                  : presentation === "FAIL"
                    ? "불합격"
                    : presentation === "PENDING"
                      ? "보류"
                      : "Error: 심사 결과를 선택하지 않았습니다."}
              </b>
            </BasicRow.Text>
          </BasicRow>
        </RowGroup>
      )}
      <RowGroup>
        <BasicRow field="심사 의견">
          <BasicRow.Text>{comment !== undefined ? comment : "(파일 업로드)"}</BasicRow.Text>
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
