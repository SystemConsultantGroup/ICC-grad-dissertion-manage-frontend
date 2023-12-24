export interface CommonApiResponse {
  message: string;
}

export interface PagedApiResponse<T> extends CommonApiResponse {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  content: T[];
}

export type Role = "ADMIN" | "PROFESSOR" | "STUDENT";

export interface User {
  id: number;
  deptId: number | null;
  name: string;
  email: string;
  phone: string;
  type: Role;
}
