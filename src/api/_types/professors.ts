import { CommonApiResponse, PagedApiResponse, PagedQueryRequest } from "./common";
import { Department } from "./department";

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

export interface Professor {
  id: number;
  loginId: string;
  name: string;
  email: string;
  phone: string;
  department: Department;
}

export interface ProfessorResponse extends Professor, CommonApiResponse {
  createdAt: string;
  updatedAt: string;
}

export interface PagedProfessorsResponse
  extends PagedApiResponse<Omit<ProfessorResponse, "message">> {}

export interface CreateProfessorRequestBody extends Omit<Professor, "id" | "department"> {
  password: string;
  deptId: number;
}

export interface SelectProfessorFormValues {
  departmentId: Professor["department"]["id"];
  professorId: number;
}
