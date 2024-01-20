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

export type Stage = "PRELIMINARY" | "MAIN";
export type Status = "UNEXAMINED" | "PASS" | "FAIL" | "PENDING";

export interface Thesis {
  title: string;
  abstract: string;
  stage: Stage;
  summary: Status;
}
