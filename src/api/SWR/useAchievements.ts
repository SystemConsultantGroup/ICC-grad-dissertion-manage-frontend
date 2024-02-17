"use client";

import { API_ROUTES } from "@/api/apiRoute";
import { useAuth } from "@/components/common/AuthProvider";
import { useConditionalSWR } from "./useConditionalSWR";
import { PagedAchievementRequestQuery, PagedAchievementResponse } from "../_types/achievement";

/**
 * @description 연구실적 목록 조회
 * @param shouldFetch true면 fetch, false면 fetch하지 않음
 * @default shouldFetch = true
 */
function useAchievements(queryParams: PagedAchievementRequestQuery, shouldFetch = true) {
  const { token } = useAuth();
  const query = { ...queryParams };

  const result = useConditionalSWR<PagedAchievementResponse>(
    { url: API_ROUTES.achievement.get(), query, token },
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

export default useAchievements;
