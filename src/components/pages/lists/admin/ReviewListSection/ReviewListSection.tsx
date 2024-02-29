/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { getPageSizeStartEndNumber } from "@/api/_utils/getPageSizeStartEndNumber";
import { handleDownloadFile } from "@/api/_utils/handleDownloadFile";
import { objectToQueryString } from "@/api/_utils/objectToUrl";
import { API_ROUTES } from "@/api/apiRoute";
import dayjs from "dayjs";
import { PAGE_SIZES } from "@/constants/pageSize";
import { useDebouncedState } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import {
  ActionIcon,
  Button,
  Center,
  Group,
  Popover,
  Select,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { SectionHeader } from "@/components/common/SectionHeader";
import { IconDownload } from "@tabler/icons-react";
import { Table } from "@/components/common/Table";
import Pagination from "@/components/common/Pagination";
import { DepartmentSelect } from "@/components/common/selects/DepartmentSelect";
import { DATE_TIME_FORMAT_HYPHEN } from "@/constants/date";
import { PagedReviewsRequestQuery } from "@/api/_types/reviews";
import { useAdminReviewStatus } from "@/api/SWR";
import { PAGE_NUMBER_GET_ALL, PAGE_SIZE_GET_ALL } from "@/constants/pagination";
import { REFRESH_DEFAULT_PAGE_NUMBER } from "../../_constants/page";
import { TChangeQueryArg } from "../../_types/common";
import { REVIEW_RESULT_TABLE_HEADERS } from "../../_constants/table";

function ReviewListSection() {
  const { push } = useRouter();
  const [pageSize, setPageSize] = useState<string | null>(String(PAGE_SIZES[0]));
  const [pageNumber, setPageNumber] = useState(1);
  const pageSizeNumber = Number(pageSize);
  const [query, setQuery] = useDebouncedState<PagedReviewsRequestQuery>(
    {
      pageNumber,
      pageSize: pageSizeNumber,
    },
    500
  );
  const {
    data: reviewStatus,
    isLoading,
    pageData,
  } = useAdminReviewStatus({ ...query, pageNumber, pageSize: pageSizeNumber });

  const { startNumber } = getPageSizeStartEndNumber({
    pageNumber,
    pageSize: Number(pageSize ?? 0),
    arrayLength: reviewStatus?.length ?? 0,
  });

  const startIndex = pageData?.pageNumber
    ? (pageData.pageNumber - 1) * Number(pageData.pageSize) + 1
    : 0;
  const endIndex = reviewStatus ? startIndex + reviewStatus.length - 1 : 0;

  const handleDownloadReviews = (option: "all" | "filtered") => {
    const dateString = dayjs().format(DATE_TIME_FORMAT_HYPHEN);
    const sizeAll = `?pageNumber=${PAGE_NUMBER_GET_ALL}&pageSize=${PAGE_SIZE_GET_ALL}`;
    const queryString = objectToQueryString({
      ...query,
      pageSize: PAGE_SIZE_GET_ALL,
      pageNumber: PAGE_NUMBER_GET_ALL,
    });

    const isAll = option === "all";
    const urlSuffix = isAll ? sizeAll : queryString;

    const fileLink = API_ROUTES.review.current.excel() + urlSuffix;
    handleDownloadFile({
      fileLink,
      fileName: `심사 목록 일괄 다운로드 파일_${dateString}.xlsx`,
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
                      handleDownloadReviews("all");
                    }}
                  >
                    심사 목록 전체 출력
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleDownloadReviews("filtered");
                    }}
                  >
                    심사 목록 필터 출력
                  </Button>
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </Group>
        </SectionHeader.Buttons>
      </SectionHeader>
      {isLoading && <Skeleton />}
      <Table headers={REVIEW_RESULT_TABLE_HEADERS} h={650}>
        {/* 필터 영역 */}
        <Table.FilterRow>
          <Table.Data>필터</Table.Data>
          <Table.Data>
            <Select
              w="100%"
              miw={80}
              placeholder="구분"
              onChange={(value) => {
                handleChangeFilter<string | null>({ name: "stage", value });
              }}
              allowDeselect
              data={[
                { label: "예심", value: "PRELIMINARY" },
                { label: "본심", value: "MAIN" },
              ]}
            />
          </Table.Data>
          <Table.Data>
            <Table.TextInput
              w="100%"
              miw={80}
              placeholder="저자"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChangeFilter<string>({ name: "author", value: event.target.value });
              }}
            />
          </Table.Data>
          <Table.Data>
            <DepartmentSelect
              w="100%"
              miw={150}
              placeholder="학과"
              onChange={(value) => {
                handleChangeFilter<string | null>({ name: "department", value });
              }}
              allowDeselect
            />
          </Table.Data>
          <Table.Data>
            <Table.TextInput
              w="100%"
              miw={300}
              placeholder="논문 제목"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChangeFilter<string>({ name: "title", value: event.target.value });
              }}
            />
          </Table.Data>
          <Table.Data>-</Table.Data>
        </Table.FilterRow>
        {reviewStatus
          ?.filter((review) => review.stage !== "REVISION")
          .map((review, index) => (
            <Table.Row
              key={review.id}
              onClick={() => {
                push(`reviews/${review.id}`);
              }}
            >
              <Table.Data>{index + 1 + (pageNumber - 1) * pageSizeNumber}</Table.Data>
              <Table.Data>{review.stage === "MAIN" ? "본심" : "예심"}</Table.Data>
              <Table.Data>{review.student}</Table.Data>
              <Table.Data>{review.department}</Table.Data>
              <Table.Data>{review.title}</Table.Data>
              <Table.Data>
                <Stack gap={0}>
                  {review.reviews.map((reviewInfo, i) => (
                    <Text key={i} fw={600} style={{ whiteSpace: "nowrap" }}>
                      {reviewInfo.reviewer.name} /{" "}
                      {reviewInfo.contentStatus === "UNEXAMINED" ? "진행중" : "심사 완료"}
                    </Text>
                  ))}
                </Stack>
              </Table.Data>
            </Table.Row>
          ))}
      </Table>
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

export default ReviewListSection;
