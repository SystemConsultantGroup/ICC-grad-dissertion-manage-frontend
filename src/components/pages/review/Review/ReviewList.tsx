import { Button, Group, Stack } from "@mantine/core";
import { Table } from "@/components/common/Table";
import TableRow from "@/components/common/Table/_elements/TableRow";
import TableData from "@/components/common/Table/_elements/TableData";
import { ApiDownloadButton } from "@/components/common/Buttons";
import { TitleRow } from "@/components/common/rows";
import { Stage, Status } from "@/api/_types/common";
import { File } from "@/api/_types/file";
import { TableHeaderProps } from "@/components/common/Table/_elements/TableHeader";

export interface ReviewListProps {
  title: string;
  stage: Stage;
  reviews: SimpleReview[];
}

export interface AdminReviewListProps extends ReviewListProps {
  onModify: (review: SimpleReview) => void;
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
  const headers: TableHeaderProps[] =
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
        ];
  const table =
    stage === "REVISION" ? (
      <Table headers={[{ label: "심사위원", widthPercentage: 12 }, { label: "확인 여부" }]}>
        {reviews.map((review) => (
          <TableRow key={review.id}>
            <TableData>{review.reviewer.name}</TableData>
            <TableData>{nameForStatus(review.contentStatus)}</TableData>
          </TableRow>
        ))}
      </Table>
    ) : (
      <Table headers={headers}>
        {reviews.map((review) => (
          <TableRow key={review.id}>
            <TableData>{review.reviewer.name}</TableData>
            <TableData>{nameForStatus(review.contentStatus)}</TableData>
            {stage === "MAIN" && <TableData>{nameForStatus(review.presentationStatus)}</TableData>}
            <TableData>{review.comment}</TableData>
            <TableData>
              <ApiDownloadButton file={review.file} size="xs" />
            </TableData>
          </TableRow>
        ))}
      </Table>
    );
  return (
    <Stack gap={0}>
      <TitleRow title={title} />
      <Group pl={8}>{table}</Group>
    </Stack>
  );
}

export function AdminReviewList({ title, stage, reviews, onModify }: AdminReviewListProps) {
  const headers: TableHeaderProps[] =
    stage === "MAIN"
      ? [
          { label: "심사위원", widthPercentage: 12 },
          { label: "내용 심사 결과", widthPercentage: 10 },
          { label: "구두 심사 결과", widthPercentage: 10 },
          { label: "심사 의견", widthPercentage: 56 },
          { label: "심사 의견 파일" },
          { label: "심사 수정" },
        ]
      : [
          { label: "심사위원", widthPercentage: 12 },
          { label: "심사 결과", widthPercentage: 10 },
          { label: "심사 의견", widthPercentage: 62 },
          { label: "심사 의견 파일" },
          { label: "심사 수정" },
        ];

  const table =
    stage === "REVISION" ? (
      <Table headers={[{ label: "심사위원", widthPercentage: 12 }, { label: "확인 여부" }]}>
        {reviews.map((review) => (
          <TableRow key={review.id}>
            <TableData>{review.reviewer.name}</TableData>
            <TableData>{nameForStatus(review.contentStatus)}</TableData>
          </TableRow>
        ))}
      </Table>
    ) : (
      <Table headers={headers}>
        {reviews.map((review) => (
          <TableRow key={review.id}>
            <TableData>{review.reviewer.name}</TableData>
            <TableData>{nameForStatus(review.contentStatus)}</TableData>
            {stage === "MAIN" && <TableData>{nameForStatus(review.presentationStatus)}</TableData>}
            <TableData>{review.comment}</TableData>
            <TableData>
              <ApiDownloadButton file={review.file} size="xs" />
            </TableData>
            <TableData>
              <Button size="xs" onClick={() => onModify(review)}>
                수정하기
              </Button>
            </TableData>
          </TableRow>
        ))}
      </Table>
    );
  return (
    <Stack gap={0}>
      <TitleRow title={title} />
      <Group pl={8}>{table}</Group>
    </Stack>
  );
}
