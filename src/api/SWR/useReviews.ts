"use client";

import { API_ROUTES } from "@/api/apiRoute";
import { useAuth } from "@/components/common/AuthProvider";
import { useConditionalSWR } from "./useConditionalSWR";
import { PagedProfReviewsRequestQuery, PagedReviewsResponse } from "../_types/reviews";

/**
 * @description 심사대상 목록 조회
 * @param queryParams {pageSize, pageNumber, author, department, stage, title, status}
 * @param shouldFetch true면 fetch, false면 fetch하지 않음
 * @param isFinal true면 최종심사, false 기본값
 * @default shouldFetch = true
 */
function useReviews(
  queryParams: PagedProfReviewsRequestQuery,
  isFinal: boolean,
  shouldFetch = true
) {
  const { token } = useAuth();
  const query = { ...queryParams };

  const result = useConditionalSWR<PagedReviewsResponse>(
    { url: isFinal ? API_ROUTES.review.final.get() : API_ROUTES.review.get(), query, token },
    !!token && shouldFetch
  );

  return {
    data: result.data?.content,
    pageData: result.data && {
      pageSize: result.data.pageSize,
      pageNumber: result.data.pageNumber,
      totalCount: result.data.totalCount,
      totalPages: result.data.totalPages,
    },
    get isLoading() {
      return result.isLoading;
    },
    get error() {
      return result.error;
    },
    get mutate() {
      return result.mutate;
    },
  };
}

export default useReviews;
