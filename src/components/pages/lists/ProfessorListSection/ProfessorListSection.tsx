/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import useProfessors from "@/api/SWR/useProfessors";
import { PagedProfessorsRequestQuery } from "@/api/_types/professors";
import { getPageSizeStartEndNumber } from "@/api/_utils/getPageSizeStartEndNumber";
import { handleDownloadFile } from "@/api/_utils/handleDownloadFile";
import { objectToQueryString } from "@/api/_utils/objectToUrl";
import { API_ROUTES } from "@/api/apiRoute";
import { DATE_TIME_FORMAT_HYPHEN } from "@/constants/date";
import { PAGE_SIZES } from "@/constants/pageSize";
import { useDebouncedState } from "@mantine/hooks";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import {
  ActionIcon,
  Button,
  Center,
  Group,
  Popover,
  ScrollArea,
  Skeleton,
  Stack,
} from "@mantine/core";
import { SectionHeader } from "@/components/common/SectionHeader";
import { IconDownload, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { Table } from "@/components/common/Table";
import { DepartmentSelect } from "@/components/common/selects/DepartmentSelect";
import Pagination from "@/components/common/Pagination";
import { PROF_TABLE_HEADERS } from "../_constants/table";
import { REFRESH_DEFAULT_PAGE_NUMBER } from "../_constants/page";
import { TChangeQueryArg } from "../_types/common";

function ProfessorListSection() {
  const { push } = useRouter();
  const [pageSize, setPageSize] = useState<string | null>(String(PAGE_SIZES[0]));
  const [pageNumber, setPageNumber] = useState(1);
  const pageSizeNumber = Number(pageSize);
  const [query, setQuery] = useDebouncedState<PagedProfessorsRequestQuery>(
    {
      pageNumber,
      pageSize: pageSizeNumber,
    },
    500
  );
  const {
    data: professors,
    isLoading,
    pageData,
  } = useProfessors({ ...query, pageNumber, pageSize: pageSizeNumber });

  const { startNumber, endNumber } = getPageSizeStartEndNumber({
    pageNumber,
    pageSize: Number(pageSize ?? 0),
    arrayLength: professors?.length ?? 0,
  });

  const startIndex = pageData?.pageNumber
    ? (pageData.pageNumber - 1) * Number(pageData.pageSize) + 1
    : 0;
  const endIndex = professors ? startIndex + professors.length - 1 : 0;

  // Todo: 파일명 및 필터 저장 방식 논의
  const handleDownloadProfessorExcel = (option: "all" | "filtered") => {
    const dateString = dayjs().format(DATE_TIME_FORMAT_HYPHEN);
    const queryString = objectToQueryString({ ...query });

    const isAll = option === "all";
    const urlSuffix = isAll ? "" : queryString;

    const fileLink = API_ROUTES.professor.excel.get() + urlSuffix;

    handleDownloadFile({
      fileLink,
      fileName: `학생 일괄 다운로드 파일_${dateString}.xlsx`,
    });
  };

  const handleChangeFilter = <T,>({ name, value }: TChangeQueryArg<T>) => {
    // useDebuncedState 에서 update 함수 타입이 정의되어 있지 않아 타입에러 발생
    setQuery(((prev: any) => ({
      ...prev,
      [name]: value === "" ? undefined : value,
      pageNumber: REFRESH_DEFAULT_PAGE_NUMBER,
    })) as any);
  };

  useEffect(() => {
    setPageNumber(REFRESH_DEFAULT_PAGE_NUMBER);
  }, [pageSize]);

  return (
    <Stack>
      <SectionHeader
        withPageSizeSelector
        pageSize={pageSize}
        setPageSize={setPageSize}
        withSearchBar={false}
        total={pageData ? pageData?.totalCount : 0}
        startIndex={startNumber}
        endIndex={endIndex}
      >
        <SectionHeader.Buttons>
          <Group>
            <Button size="xs" leftSection={<IconPlus />} component={Link} href="prof-register">
              교수 추가
            </Button>
            <Popover width={200} position="bottom" withArrow shadow="md">
              <Popover.Target>
                <ActionIcon variant="outline" color="blue">
                  <IconDownload size={16} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <Stack>
                  <Button
                    onClick={() => {
                      handleDownloadProfessorExcel("all");
                    }}
                  >
                    전체 교수 엑셀 저장
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleDownloadProfessorExcel("filtered");
                    }}
                  >
                    필터 교수 엑셀 저장
                  </Button>
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </Group>
        </SectionHeader.Buttons>
      </SectionHeader>
      {isLoading && <Skeleton />}
      <ScrollArea type="hover" offsetScrollbars style={{ width: "100%", overflow: "visible" }}>
        <Table headers={PROF_TABLE_HEADERS}>
          {/* 필터 영역 */}
          <Table.Row pointer={false}>
            <Table.Data>필터</Table.Data>
            <Table.Data>
              <Table.TextInput
                w={150}
                placeholder="아이디"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleChangeFilter<string>({ name: "loginId", value: event.target.value });
                }}
              />
            </Table.Data>
            <Table.Data>
              <Table.TextInput
                w={150}
                placeholder="이름"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleChangeFilter<string>({ name: "name", value: event.target.value });
                }}
              />
            </Table.Data>
            <Table.Data>
              <Table.TextInput
                w={150}
                placeholder="이메일"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleChangeFilter<string>({ name: "email", value: event.target.value });
                }}
              />
            </Table.Data>
            <Table.Data>
              <Table.TextInput
                w={150}
                placeholder="연락처"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleChangeFilter<string>({ name: "phone", value: event.target.value });
                }}
              />
            </Table.Data>
            <Table.Data>
              <DepartmentSelect
                w={150}
                placeholder="소속"
                onChange={(value) => {
                  handleChangeFilter<string | null>({ name: "deptId", value });
                }}
                allowDeselect
              />
            </Table.Data>
          </Table.Row>
          {professors?.map((professor, index) => (
            <Table.Row
              key={professor.id}
              onClick={() => {
                push(`professors/${professor.id}`);
              }}
            >
              <Table.Data>{index + 1 + (pageNumber - 1) * pageSizeNumber}</Table.Data>
              <Table.Data>{professor.loginId}</Table.Data>
              <Table.Data>{professor.name}</Table.Data>
              <Table.Data>{professor.email}</Table.Data>
              <Table.Data>{professor.phone}</Table.Data>
              <Table.Data>{professor.department.name}</Table.Data>
            </Table.Row>
          ))}
        </Table>
      </ScrollArea>
      <Center>
        <Pagination
          value={pageNumber}
          onChange={setPageNumber}
          total={pageData ? pageData?.totalPages : 1}
        />
      </Center>
    </Stack>
  );
}

export default ProfessorListSection;
