"use client";

import { API_ROUTES } from "@/api/apiRoute";
import { useAuth } from "@/components/common/AuthProvider";
import { PagedStudentsRequestQuery, PagedStudentsResponse } from "@/api/_types/students";
import { useConditionalSWR } from "./useConditionalSWR";

/**
 * @description 학생 목록 조회
 * @param queryParams {pageSize, pageNumber, studentNumber, name, phone, departmentId, phaseId, isLock}
 * @param shouldFetch true면 fetch, false면 fetch하지 않음
 * @default shouldFetch = true
 */
function useStudents(queryParams: PagedStudentsRequestQuery, shouldFetch = true) {
  const { token } = useAuth();
  const query = { ...queryParams };

  const result = useConditionalSWR<PagedStudentsResponse>(
    { url: API_ROUTES.student.get(), query, token },
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

export default useStudents;
