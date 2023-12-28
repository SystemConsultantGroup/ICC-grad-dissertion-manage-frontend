"use client";

import { useAuth } from "@/components/common/AuthProvider";
import { API_ROUTES } from "@/api/apiRoute";
import { DepartmentsResponse } from "@/api/_types/department";
import { useConditionalSWR } from "./useConditionalSWR";

/**
 * @description 학과 목록 조회
 */
function useDepartments(shouldFetch = true) {
  const { token } = useAuth();

  return useConditionalSWR<DepartmentsResponse>(
    { url: API_ROUTES.department.get(), token },
    !!token && shouldFetch
  );
}

export default useDepartments;
