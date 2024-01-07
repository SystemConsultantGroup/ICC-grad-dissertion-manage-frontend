"use client";

import { API_ROUTES } from "@/api/apiRoute";
import { useAuth } from "@/components/common/AuthProvider";
import { useConditionalSWR } from "./useConditionalSWR";
import { PagedReviewResultsRequestQuery, PagedReviewsResponse } from "../_types/reviews";

/**
 * @description 심사결과 목록 조회
 * @param queryParams {pageSize, pageNumber, author, department, stage, title, summary}
 * @param shouldFetch true면 fetch, false면 fetch하지 않음
 * @default shouldFetch = true
 */
function useReviews(queryParams: PagedReviewResultsRequestQuery, shouldFetch = true) {
  const { token } = useAuth();
  const query = { ...queryParams };

  const result = useConditionalSWR<PagedReviewsResponse>(
    { url: API_ROUTES.review.result.get(), query, token },
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
