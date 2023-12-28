export interface Department {
  id: number;
  name: string;
  userCount: number;
}

export interface DepartmentsResponse {
  departments: Department[];
}
