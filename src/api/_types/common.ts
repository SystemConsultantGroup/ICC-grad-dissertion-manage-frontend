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
  contents: T[];
}

export interface PagedQueryRequest {
  pageNumber: number;
  pageSize: number;
}
