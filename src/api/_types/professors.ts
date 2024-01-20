import { CommonApiResponse, PagedApiResponse, PagedQueryRequest } from "./common";
import { User } from "./user";

export interface PagedProfessorsRequestQuery extends PagedQueryRequest {
  loginId?: string;
  name?: string;
  email?: string;
  phone?: string;
  deptId?: number;
}

export interface ProfessorsExcelRequestQuery {
  loginId?: string;
  name?: string;
  email?: string;
  phone?: string;
  deptId?: number;
}

export interface ProfessorResponse extends User, CommonApiResponse {
  createdAt: string;
  updatedAt: string;
}

export interface PagedProfessorsResponse
  extends PagedApiResponse<Omit<ProfessorResponse, "message">> {}

export interface CreateProfessorRequestBody extends Omit<User, "id" | "department"> {
  password: string;
  deptId: number;
}

export interface SelectProfessorFormValues {
  departmentId: User["department"]["id"];
  professorId: number;
}
