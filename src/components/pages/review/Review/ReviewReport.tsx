import { Stack } from "@mantine/core";
import { ApiDownloadButton } from "@/components/common/Buttons";
import { BasicRow, RowGroup, TitleRow } from "@/components/common/rows";
import { Status } from "@/api/_types/common";
import { ThesisReview } from "@/api/_types/reviews";

function nameForStatus(status: Status) {
  return status === "PASS"
    ? "합격"
    : status === "FAIL"
      ? "불합격"
      : status === "PENDING"
        ? "보류"
        : "미완료";
}

export function ReviewReportAdmin({ review }: { review: ThesisReview | undefined }) {
  if (!review) {
    return (
      <Stack gap={0}>
        <TitleRow title="심사 보고서" />
        <RowGroup>
          <BasicRow field="최종 심사 결과">
            <BasicRow.Text>-</BasicRow.Text>
          </BasicRow>
        </RowGroup>
      </Stack>
    );
  }
  return (
    <Stack gap={0}>
      <TitleRow title="심사 보고서" />
      <RowGroup>
        <BasicRow field="최종 심사 결과">
          <BasicRow.Text>{nameForStatus(review.contentStatus)}</BasicRow.Text>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="심사 보고서">
          <ApiDownloadButton file={review.file} />
        </BasicRow>
      </RowGroup>
    </Stack>
  );
}
