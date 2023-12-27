import { CommonApiResponse } from "./common";
import { Department } from "./department";

export type Role = "ADMIN" | "PROFESSOR" | "STUDENT";

export interface User {
  id: number;
  loginId: string;
  name: string;
  email: string;
  phone: string;
  type: Role;
  department: Omit<Department, "userCount">;
}

export interface UserResponse extends CommonApiResponse {
  createdAt: string;
  updatedAt: string;
}
