export interface Department {
  id: number;
  name: string;
  modificationFlag: boolean;
  userCount: number;
}

export interface DepartmentsResponse {
  departments: Department[];
}
