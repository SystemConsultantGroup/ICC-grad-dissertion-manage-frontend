import { Group, Stack } from "@mantine/core";
import { Table } from "@/components/common/Table";
import TableRow from "@/components/common/Table/_elements/TableRow";
import TableData from "@/components/common/Table/_elements/TableData";
import { DownloadButton } from "@/components/common/Buttons";
import { TitleRow } from "@/components/common/rows";
import { Stage } from "../ArticleInfo/ArticleInfo";

export interface ReviewListProps {
  title: string;
  stage: Stage;
}

export function ReviewList({ title, stage }: ReviewListProps) {
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
          <TableRow>
            <TableData>김교수</TableData>
            <TableData>합격</TableData>
            {stage === "MAIN" && <TableData>합격</TableData>}
            <TableData>-</TableData>
            <TableData>
              <DownloadButton link="." size="xs" />
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>김교수</TableData>
            <TableData>합격</TableData>
            {stage === "MAIN" && <TableData>합격</TableData>}
            <TableData>-</TableData>
            <TableData>
              <DownloadButton link="." size="xs" />
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>김교수</TableData>
            <TableData>합격</TableData>
            {stage === "MAIN" && <TableData>합격</TableData>}
            <TableData>-</TableData>
            <TableData>
              <DownloadButton link="." size="xs" />
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>김교수</TableData>
            <TableData>불합격</TableData>
            {stage === "MAIN" && <TableData>합격</TableData>}
            <TableData>test</TableData>
            <TableData>
              <DownloadButton link="." size="xs" disabled />
            </TableData>
          </TableRow>
        </Table>
      </Group>
    </Stack>
  );
}