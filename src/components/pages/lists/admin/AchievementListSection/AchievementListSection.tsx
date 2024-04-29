/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { ActionIcon, Button, Center, Group, Popover, Select, Skeleton, Stack } from "@mantine/core";
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
import useAchievements from "@/api/SWR/useAchievements";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT_HYPHEN } from "@/constants/date";
import { objectToQueryString } from "@/api/_utils/objectToUrl";
import { API_ROUTES } from "@/api/apiRoute";
import { handleDownloadFile } from "@/api/_utils/handleDownloadFile";
import { TChangeQueryArg } from "../../_types/common";
import { REFRESH_DEFAULT_PAGE_NUMBER } from "../../_constants/page";
import { ACHIEVEMENT_TABLE_HEADERS } from "../../_constants/table";
import { formatISSN } from "../../StudentAchievementListSection/StudentAchievementListSection";

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

  const {
    data: achievements,
    isLoading,
    pageData,
  } = useAchievements({ ...query, pageNumber, pageSize: pageSizeNumber });

  const transformedAchievementTypeList = Object.entries(ACHIEVEMENT_TYPE_LOOKUP_TABLE).map(
    ([key, value]) => ({ value: key, label: value })
  );

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

  // Todo: 파일명 및 필터 저장 방식 논의
  const handleDownloadAchievementsExcel = (option: "all" | "filtered") => {
    const dateString = dayjs().format(DATE_TIME_FORMAT_HYPHEN);
    const queryString = objectToQueryString({ ...query });

    const isAll = option === "all";
    const urlSuffix = isAll ? "" : queryString;

    const fileLink = API_ROUTES.achievement.excel() + urlSuffix;

    handleDownloadFile({
      fileLink,
      fileName: `연구실적 일괄 다운로드 파일_${dateString}.xlsx`,
    });
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
                      handleDownloadAchievementsExcel("all");
                    }}
                  >
                    전체 목록 엑셀 저장
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleDownloadAchievementsExcel("filtered");
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
      {isLoading && <Skeleton />}
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
                handleChangeFilter<string | null>({ name: "departmentId", value });
              }}
            />
          </Table.Data>
          <Table.Data>
            <Table.TextInput
              w={80}
              placeholder="저자"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChangeFilter<string>({ name: "author", value: event.target.value });
              }}
            />
          </Table.Data>
          <Table.Data>
            <Table.TextInput
              w={300}
              placeholder="논문 제목"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChangeFilter<string>({ name: "paperTitle", value: event.target.value });
              }}
            />
          </Table.Data>
          <Table.Data>
            <Select
              w={350}
              allowDeselect
              data={transformedAchievementTypeList}
              onChange={(value) => {
                handleChangeFilter<string | null>({ name: "performance", value });
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
            <></>
          </Table.Data>
          <Table.Data>
            <></>
          </Table.Data>
          <Table.Data>
            <></>
          </Table.Data>
          <Table.Data>
            <></>
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
            <Table.Data>{achievement.ISSN ? formatISSN(achievement.ISSN) : ""}</Table.Data>
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
