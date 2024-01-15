"use client";

import { Anchor, Group, Stack } from "@mantine/core";
import { Table } from "@/components/common/Table";
import TableRow from "@/components/common/Table/_elements/TableRow";
import TableData from "@/components/common/Table/_elements/TableData";
import { DownloadButton } from "@/components/common/Buttons";
import { TitleRow } from "@/components/common/rows";
import Link from "next/link";

export function ReviewResultList() {
  return (
    <Stack gap={0}>
      <TitleRow
        title="심사 결과 목록"
        subString={
          <>
            ※{" "}
            <Anchor
              component={Link}
              href={`/admin/students/${/* id */ 123}`}
              c="gray"
              underline="always"
            >
              진행중인 심사
            </Anchor>
            는 표시되지 않습니다.
          </>
        }
      />
      <Group pl={8}>
        <Table
          headers={[
            { label: "심사위원", widthPercentage: 12 },
            { label: "판정", widthPercentage: 10 },
            { label: "심사 의견", widthPercentage: 62 },
            { label: "심사 의견 파일" },
          ]}
        >
          <TableRow>
            <TableData>김교수</TableData>
            <TableData>합격</TableData>
            <TableData>-</TableData>
            <TableData>
              <DownloadButton link="." size="xs" />
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>김교수</TableData>
            <TableData>합격</TableData>
            <TableData>-</TableData>
            <TableData>
              <DownloadButton link="." size="xs" />
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>김교수</TableData>
            <TableData>합격</TableData>
            <TableData>-</TableData>
            <TableData>
              <DownloadButton link="." size="xs" />
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>김교수</TableData>
            <TableData>불합격</TableData>
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
