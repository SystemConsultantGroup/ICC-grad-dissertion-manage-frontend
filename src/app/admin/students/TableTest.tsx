"use client";

import { Center, ScrollArea, Stack, Text } from "@mantine/core";
import Pagination from "@/components/common/Pagination";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Table } from "@/components/common/Table";
import { TableHeaderProps } from "@/components/common/Table/_elements/TableHeader";
import { useEffect, useState } from "react";
import { PAGE_SIZES } from "@/constants/pageSize";

export const STUDENTS_TABLE_HEADERS: TableHeaderProps[] = [
  { label: "순번", widthPercentage: 5 },
  { label: "아이디", widthPercentage: 10 },
  { label: "이름", widthPercentage: 10 },
  { label: "이메일", widthPercentage: 15 },
  { label: "연락처", widthPercentage: 10 },
  { label: "학과", widthPercentage: 10 },
];

const REFRESH_DEFAULT_PAGE_NUMBER = 1; // 검색 필터 변경시 페이지네이션 초기화

function TableTest() {
  const [pageSize, setPageSize] = useState<string | null>(String(PAGE_SIZES[0]));
  const [pageNumber, setPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState<string>();
  const [invalid, setInvalid] = useState<boolean>();
  useEffect(() => {
    setPageNumber(REFRESH_DEFAULT_PAGE_NUMBER);
  }, [pageSize]);

  return (
    <Stack>
      <SectionHeader
        withPageSizeSelector
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={0}
        onSearchChange={setSearchValue}
        onInvalidChange={setInvalid}
        startIndex={1}
        endIndex={10}
      ></SectionHeader>
      <ScrollArea type="hover" offsetScrollbars style={{ width: "100%", overflow: "visible" }}>
        <Table headers={STUDENTS_TABLE_HEADERS}>
          <Table.Row>
            <Table.Data>1</Table.Data>
            <Table.Data>1234</Table.Data>
            <Table.Data>김--</Table.Data>
            <Table.Data>test@skku.edu</Table.Data>
            <Table.Data>031-123-1234</Table.Data>
            <Table.Data>전자전기컴퓨터공학과</Table.Data>
          </Table.Row>
          <Table.Row>
            <Table.Data>1</Table.Data>
            <Table.Data>1234</Table.Data>
            <Table.Data>김--</Table.Data>
            <Table.Data>test@skku.edu</Table.Data>
            <Table.Data>031-123-1234</Table.Data>
            <Table.Data>전자전기컴퓨터공학과</Table.Data>
          </Table.Row>
        </Table>
      </ScrollArea>
      <Center>
        <Pagination value={pageNumber} onChange={setPageNumber} total={1} />
      </Center>

      <Text>{searchValue}</Text>
      <Text>{invalid ? "수정중" : "검색결과"}</Text>
    </Stack>
  );
}

export default TableTest;
