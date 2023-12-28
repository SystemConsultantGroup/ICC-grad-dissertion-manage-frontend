"use client";

import useSWR from "swr";
import { FetcherArgs } from "@/api/fetcher";

export function useConditionalSWR<T>(args: FetcherArgs, shouldFetch = true) {
  return useSWR<T>(shouldFetch ? args : null);
}
