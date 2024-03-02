import { AxiosError } from "axios";

export interface CommonApiResponse {
  message: string;
}

export interface CommonApiErrorResponse extends CommonApiResponse {
  statusCode: number;
}
export interface ClientAxiosErrorResponse extends AxiosError<CommonApiErrorResponse> {}

export interface PagedApiResponse<T> extends CommonApiResponse {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  content: T[];
}

export interface PagedQueryRequest {
  pageNumber: number;
  pageSize: number;
}

export type Stage = "PRELIMINARY" | "MAIN" | "REVISION";
export type Status = "UNEXAMINED" | "PASS" | "FAIL" | "PENDING";

export type StageLookupTable = Record<Stage, string>;
export type StatusLookupTable = Record<Status, string>;

export const STAGE_LOOKUP_TABLE: StageLookupTable = {
  PRELIMINARY: "예심",
  MAIN: "본심",
  REVISION: "수정 단계",
};

export const STATUS_LOOKUP_TABLE: StatusLookupTable = {
  UNEXAMINED: "심사 전",
  PASS: "합격",
  FAIL: "불합격",
  PENDING: "보류",
};

export interface Thesis {
  title: string;
  abstract: string;
  stage: Stage;
  summary: Status;
}
