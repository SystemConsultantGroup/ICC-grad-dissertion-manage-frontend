"use client";

import { API_ROUTES } from "@/api/apiRoute";
import { useAuth } from "@/components/common/AuthProvider";
import { ThesisRequestQuery } from "@/api/_types/thesis";
import { ThesisInfo } from "@/api/_types/reviews";
import { useConditionalSWR } from "./useConditionalSWR";

/**
 * @description 교수 목록 조회
 * @param studentId 학생 id
 * @param queryParams {type}
 * @param shouldFetch true면 fetch, false면 fetch하지 않음
 * @default shouldFetch = true
 */
function useThesis(studentId: number, queryParams: ThesisRequestQuery, shouldFetch = true) {
  const { token } = useAuth();
  const query = { ...queryParams };

  const result = useConditionalSWR<ThesisInfo>(
    { url: API_ROUTES.student.getThesis(studentId), query, token },
    !!token && shouldFetch
  );

  return {
    data: result.data,
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

export default useThesis;
