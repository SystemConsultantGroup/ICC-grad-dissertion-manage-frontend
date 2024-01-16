import { SelectProfessorFormValues } from "@/api/_types/professors";

export default interface AdminStudentFormInputs {
  loginId: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  deptId: string;
  sysId: string;

  chairman: SelectProfessorFormValues | null;
  professors: SelectProfessorFormValues[];

  paperTitle: string;
}
