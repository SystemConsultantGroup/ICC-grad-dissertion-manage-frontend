import { FileResponse } from "@/api/_types/file";
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
  signFile?: FileResponse;
}

export interface UserResponse extends CommonApiResponse, User {
  createdAt: string;
  updatedAt: string;
}
