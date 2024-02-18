import { CommonApiResponse } from "./common";

export interface Department {
  id: number;
  name: string;
  modificationFlag: boolean;
  userCount: number;
}

export interface DepartmentsResponse extends CommonApiResponse {
  departments: Department[];
}
