"use client";

import { API_ROUTES } from "@/api/apiRoute";
import { useAuth } from "@/components/common/AuthProvider";
import { useConditionalSWR } from "./useConditionalSWR";
import { PagedReviewStatusResponse, PagedReviewsRequestQuery } from "../_types/reviews";

/**
 * @description 심사현황 목록 조회(관리자)
 * @param queryParams {pageSize, pageNumber, author, department, stage, title, summary}
 * @param shouldFetch true면 fetch, false면 fetch하지 않음
 * @default shouldFetch = true
 */
function useAdminReviewStatus(queryParams: PagedReviewsRequestQuery, shouldFetch = true) {
  const { token } = useAuth();
  const query = { ...queryParams };

  const swrResult = useConditionalSWR<PagedReviewStatusResponse>(
    {
      url: API_ROUTES.review.current.get(),
      query,
      token,
    },
    !!token && shouldFetch
  );

  return {
    data: swrResult.data?.content,
    pageData: swrResult.data && {
      pageSize: swrResult.data.pageSize,
      pageNumber: swrResult.data.pageNumber,
      totalCount: swrResult.data.totalCount,
      totalPages: swrResult.data.totalPages,
    },
    get isLoading() {
      return swrResult.isLoading;
    },
    get error() {
      return swrResult.error;
    },
    get mutate() {
      return swrResult.mutate;
    },
  };
}

export default useAdminReviewStatus;
