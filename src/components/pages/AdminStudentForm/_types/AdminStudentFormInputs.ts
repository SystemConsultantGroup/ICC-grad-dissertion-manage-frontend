import { SelectProfessorFormValues } from "@/api/_types/professors";

export default interface AdminStudentFormInputs {
  basicInfo: {
    loginId: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    deptId: string;
    phaseId: string;
  };

  chairman: SelectProfessorFormValues | null;
  professors: SelectProfessorFormValues[];

  thesisTitle: string;
}
