"use client";

import { fetcher } from "@/api/fetcher";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

interface Props {
  children: ReactNode;
}

export const SWRProvider = ({ children }: Props) => (
  <SWRConfig
    value={{
      fetcher,
      shouldRetryOnError: false,
    }}
  >
    {children}
  </SWRConfig>
);
