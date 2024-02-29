import { Group, Stack } from "@mantine/core";
import { Table } from "@/components/common/Table";
import TableRow from "@/components/common/Table/_elements/TableRow";
import TableData from "@/components/common/Table/_elements/TableData";
import { ApiDownloadButton } from "@/components/common/Buttons";
import { TitleRow } from "@/components/common/rows";
import { Stage, Status } from "@/api/_types/common";
import { File } from "@/api/_types/file";

export interface ReviewListProps {
  title: string;
  stage: Stage;
  reviews: SimpleReview[];
}

export interface SimpleReview {
  id: string | number;
  reviewer: { name: string };
  contentStatus: Status;
  presentationStatus: Status;
  comment: string;
  file: File | null;
}

function nameForStatus(status: Status) {
  return status === "PASS"
    ? "합격"
    : status === "FAIL"
      ? "불합격"
      : status === "PENDING"
        ? "보류"
        : "미완료";
}

export function ReviewList({ title, stage, reviews }: ReviewListProps) {
  return (
    <Stack gap={0}>
      <TitleRow title={title} />
      <Group pl={8}>
        <Table
          headers={
            stage === "MAIN"
              ? [
                  { label: "심사위원", widthPercentage: 12 },
                  { label: "내용 심사 결과", widthPercentage: 10 },
                  { label: "구두 심사 결과", widthPercentage: 10 },
                  { label: "심사 의견", widthPercentage: 56 },
                  { label: "심사 의견 파일" },
                ]
              : [
                  { label: "심사위원", widthPercentage: 12 },
                  { label: "심사 결과", widthPercentage: 10 },
                  { label: "심사 의견", widthPercentage: 62 },
                  { label: "심사 의견 파일" },
                ]
          }
        >
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableData>{review.reviewer.name}</TableData>
              <TableData>{nameForStatus(review.contentStatus)}</TableData>
              {stage === "MAIN" && (
                <TableData>{nameForStatus(review.presentationStatus)}</TableData>
              )}
              <TableData>{review.comment}</TableData>
              <TableData>
                <ApiDownloadButton file={review.file} size="xs" />
              </TableData>
            </TableRow>
          ))}
        </Table>
      </Group>
    </Stack>
  );
}
