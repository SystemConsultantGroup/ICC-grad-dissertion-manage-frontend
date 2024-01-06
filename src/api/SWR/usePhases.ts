"use client";

import { useAuth } from "@/components/common/AuthProvider";
import { API_ROUTES } from "@/api/apiRoute";
import { useConditionalSWR } from "./useConditionalSWR";
import { PhasesResponse } from "../_types/phase";

/**
 * @description 시스템일정 목록 조회
 */
function usePhases(shouldFetch = true) {
  const { token } = useAuth();

  return useConditionalSWR<PhasesResponse>(
    { url: API_ROUTES.phase.get(), token },
    !!token && shouldFetch
  );
}

export default usePhases;
