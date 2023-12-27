import { CommonApiResponse, PagedApiResponse, PagedQueryRequest } from "./common";
import { Department } from "./department";
import { Phase } from "./phase";

export interface PagedStudentsRequestQuery extends PagedQueryRequest {
  studentNumber?: string;
  name?: string;
  phone?: number;
  departmentId?: number;
  phaseId?: number;
  isLock?: boolean;
}

export interface StudentExcelRequestQuery {
  studentNumber?: string;
  name?: string;
  phone?: number;
  departmentId?: number;
  phaseId?: number;
  isLock?: boolean;
}

export interface Student {
  id: string;
  loginId: string;
  name: string;
  email: string;
  phone: string;
  department: Department;
  phase: Phase;
}

export interface StudentResponse extends Student, CommonApiResponse {
  createdAt: string;
  updatedAt: string;
}

export interface PagedStudentResponse extends PagedApiResponse<Omit<StudentResponse, "message">> {}

export interface CreateStudentRequestBody extends Omit<Student, "id" | "department" | "phase"> {
  password: string;
  deptId: number;
  isLock: boolean;
  headReviewerId: number;
  phaseId: number;
  reviewerIds: number[];
  preThesisTitle?: string;
  mainThesisTitle?: string;
}
