/* eslint-disable @typescript-eslint/no-explicit-any */
/* api 연결 필요 */

"use client";

import { ActionIcon, Button, Center, Group, Popover, Select, Stack } from "@mantine/core";
import { Table } from "@/components/common/Table";
import { IconDownload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DepartmentSelect } from "@/components/common/selects/DepartmentSelect";
import Pagination from "@/components/common/Pagination";
import { ChangeEvent, useEffect, useState } from "react";
import { PAGE_SIZES } from "@/constants/pageSize";
import { useDebouncedState } from "@mantine/hooks";
import {
  ACHIEVEMENT_AUTHOR_TYPE_LOOKUP_TABLE,
  ACHIEVEMENT_TYPE_LOOKUP_TABLE,
  PagedAchievementRequestQuery,
} from "@/api/_types/achievement";
import { getPageSizeStartEndNumber } from "@/api/_utils/getPageSizeStartEndNumber";
import { MOCKUP_ACHIEVEMENT_LIST } from "@/mockups/achievement";
import { ACHIEVEMENT_TABLE_HEADERS } from "../../_constants/table";
import { REFRESH_DEFAULT_PAGE_NUMBER } from "../../_constants/page";
import { TChangeQueryArg } from "../../_types/common";

function AchievementListSection() {
  const { push } = useRouter();
  const [pageSize, setPageSize] = useState<string | null>(String(PAGE_SIZES[0]));
  const [pageNumber, setPageNumber] = useState(1);
  const pageSizeNumber = Number(pageSize);
  const [query, setQuery] = useDebouncedState<PagedAchievementRequestQuery>(
    {
      pageNumber,
      pageSize: pageSizeNumber,
    },
    500
  );

  const data = MOCKUP_ACHIEVEMENT_LIST;
  const pageData = {
    pageNumber: data.pageNumber,
    pageSize: data.pageSize,
    totalCount: data.totalCount,
    totalPages: data.totalPages,
  };
  const achievements = data.content;

  const { startNumber } = getPageSizeStartEndNumber({
    pageNumber,
    pageSize: Number(pageSize ?? 0),
    arrayLength: achievements?.length ?? 0,
  });

  const startIndex = pageData?.pageNumber
    ? (pageData.pageNumber - 1) * Number(pageData.pageSize) + 1
    : 0;
  const endIndex = achievements ? startIndex + achievements.length - 1 : 0;

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
                      // handleDownloadStudentExcel("all");
                    }}
                  >
                    전체 목록 엑셀 저장
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      // handleDownloadStudentExcel("filtered");
                    }}
                  >
                    필터 목록 엑셀 저장
                  </Button>
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </Group>
        </SectionHeader.Buttons>
      </SectionHeader>
      <Table headers={ACHIEVEMENT_TABLE_HEADERS} h={650}>
        {/* 필터 영역 */}
        <Table.FilterRow>
          <Table.Data>필터</Table.Data>
          <Table.Data>
            <DepartmentSelect
              w={150}
              placeholder="학과"
              allowDeselect
              onChange={(value) => {
                handleChangeFilter<string | null>({ name: "department", value });
              }}
            />
          </Table.Data>
          <Table.Data>
            <Table.TextInput
              w={80}
              placeholder="저자"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChangeFilter<string>({ name: "name", value: event.target.value });
              }}
            />
          </Table.Data>
          <Table.Data>
            <Table.TextInput
              w={250}
              placeholder="논문 제목"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChangeFilter<string>({ name: "paperTitle", value: event.target.value });
              }}
            />
          </Table.Data>
          <Table.Data>
            <Table.TextInput
              w={100}
              placeholder="실적 구분"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChangeFilter<string>({ name: "performance", value: event.target.value });
              }}
            />
          </Table.Data>
          <Table.Data>
            <Table.TextInput
              w={100}
              placeholder="학술지명"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChangeFilter<string>({ name: "journalName", value: event.target.value });
              }}
            />
          </Table.Data>
          <Table.Data>
            <Table.TextInput
              w={100}
              placeholder="ISSN"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChangeFilter<string>({ name: "ISSN", value: event.target.value });
              }}
            />
          </Table.Data>
          <Table.Data>
            <Table.TextInput
              w={150}
              placeholder="게재년월일"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChangeFilter<string>({ name: "publicationDate", value: event.target.value });
              }}
            />
          </Table.Data>
          <Table.Data>
            <Table.TextInput
              w={110}
              placeholder="주저자여부"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChangeFilter<string>({ name: "authorType", value: event.target.value });
              }}
            />
          </Table.Data>
          <Table.Data>
            <Table.TextInput
              w={80}
              placeholder="저자수"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChangeFilter<string>({ name: "authorNumbers", value: event.target.value });
              }}
            />
          </Table.Data>
        </Table.FilterRow>
        {achievements?.map((achievement, index) => (
          <Table.Row
            key={achievement.id}
            onClick={() => {
              push(`achievement/${achievement.id}`);
            }}
          >
            <Table.Data>{index + 1 + (pageNumber - 1) * pageSizeNumber}</Table.Data>
            <Table.Data>{achievement.department}</Table.Data>
            <Table.Data>{achievement.name}</Table.Data>
            <Table.Data>{achievement.paperTitle}</Table.Data>
            <Table.Data>{ACHIEVEMENT_TYPE_LOOKUP_TABLE[achievement.performance]}</Table.Data>
            <Table.Data>{achievement.journalName}</Table.Data>
            <Table.Data>{achievement.ISSN}</Table.Data>
            <Table.Data>
              {new Date(achievement.publicationDate).toLocaleDateString("ko-KR")}
            </Table.Data>
            <Table.Data>{ACHIEVEMENT_AUTHOR_TYPE_LOOKUP_TABLE[achievement.authorType]}</Table.Data>
            <Table.Data>{achievement.authorNumbers}</Table.Data>
          </Table.Row>
        ))}
      </Table>
      <Center>
        <Pagination total={1} />
      </Center>
    </Stack>
  );
}

export default AchievementListSection;
