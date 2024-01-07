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
  ScrollArea,
  Select,
  Skeleton,
  Stack,
} from "@mantine/core";
import { SectionHeader } from "@/components/common/SectionHeader";
import { IconDownload } from "@tabler/icons-react";
import { Table } from "@/components/common/Table";
import Pagination from "@/components/common/Pagination";
import { PagedReviewsRequestQuery } from "@/api/_types/reviews";
import useReviews from "@/api/SWR/useReviews";
import { DATE_TIME_FORMAT_HYPHEN } from "@/constants/date";
import { REFRESH_DEFAULT_PAGE_NUMBER } from "../_constants/page";
import { TChangeQueryArg } from "../_types/common";
import { REVIEW_TABLE_HEADERS } from "../_constants/table";

interface Props {
  isFinal: boolean;
}

function ReviewListSection({ isFinal }: Props) {
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
    data: reviews,
    isLoading,
    pageData,
  } = useReviews({ ...query, pageNumber, pageSize: pageSizeNumber }, isFinal);

  const { startNumber, endNumber } = getPageSizeStartEndNumber({
    pageNumber,
    pageSize: Number(pageSize ?? 0),
    arrayLength: reviews?.length ?? 0,
  });

  const startIndex = pageData?.pageNumber
    ? (pageData.pageNumber - 1) * Number(pageData.pageSize) + 1
    : 0;
  const endIndex = reviews ? startIndex + reviews.length - 1 : 0;

  // Todo: 파일명 및 필터 저장 방식 논의
  const handleDownloadReviewExcel = (option: "all" | "filtered") => {
    const dateString = dayjs().format(DATE_TIME_FORMAT_HYPHEN);
    const queryString = objectToQueryString({ ...query });

    const isAll = option === "all";
    const urlSuffix = isAll ? "" : queryString;

    const fileLink = isFinal
      ? API_ROUTES.review.final.excel() + urlSuffix
      : API_ROUTES.review.excel() + urlSuffix;

    handleDownloadFile({
      fileLink,
      fileName: `심사 대상 일괄 다운로드 파일_${dateString}.xlsx`,
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
                      handleDownloadReviewExcel("all");
                    }}
                  >
                    심사 목록 전체 출력
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleDownloadReviewExcel("filtered");
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
      <ScrollArea type="hover" offsetScrollbars style={{ width: "100%", overflow: "visible" }}>
        <Table headers={REVIEW_TABLE_HEADERS}>
          {/* 필터 영역 */}
          <Table.Row pointer={false}>
            <Table.Data>필터</Table.Data>
            <Table.Data>
              <Select
                w={80}
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
                w={80}
                placeholder="저자"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleChangeFilter<string>({ name: "author", value: event.target.value });
                }}
              />
            </Table.Data>
            <Table.Data>
              <Table.TextInput
                w={500}
                placeholder="논문 제목"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleChangeFilter<string>({ name: "title", value: event.target.value });
                }}
              />
            </Table.Data>
            <Table.Data>
              <Select
                w={80}
                placeholder="현황"
                onChange={(value) => {
                  handleChangeFilter<string | null>({ name: "status", value });
                }}
                data={[
                  { label: "진행중", value: "UNEXAMINED" },
                  { label: "합격", value: "PASS" },
                  { label: "불합격", value: "FAIL" },
                  { label: "보류", value: "PENDING" },
                ]}
                allowDeselect
              />
            </Table.Data>
          </Table.Row>
          {reviews?.map((review, index) => {
            const { id, stage, student, title, status } = review;

            return (
              <Table.Row
                key={id}
                onClick={() => {
                  push(`reviews/${id}`);
                }}
              >
                <Table.Data>{index + 1 + (pageNumber - 1) * pageSizeNumber}</Table.Data>
                <Table.Data>{stage === "MAIN" ? "본심" : "예심"}</Table.Data>
                <Table.Data>{student}</Table.Data>
                <Table.Data>{title}</Table.Data>
                <Table.Data>
                  {status === "UNEXAMINED"
                    ? "진행중"
                    : status === "PASS"
                      ? "합격"
                      : status === "FAIL"
                        ? "불합격"
                        : "보류"}
                </Table.Data>
              </Table.Row>
            );
          })}
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

export default ReviewListSection;
