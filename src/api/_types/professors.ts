import { CommonApiResponse, PagedApiResponse, PagedQueryRequest } from "./common";
import { User } from "./user";

export interface ProfessorQueryBrief {
  loginId: string;
  name: string;
  email: string;
  phone: string;
  deptId: number;
}

export type PagedProfessorsRequestQuery = PagedQueryRequest & Partial<ProfessorQueryBrief>;
export type ProfessorsExcelRequestQuery = Partial<ProfessorQueryBrief>;

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
