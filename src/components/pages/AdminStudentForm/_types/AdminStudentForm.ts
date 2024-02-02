import { SelectProfessorFormValues } from "@/api/_types/professors";

export interface AdminStudentFormInputs {
  basicInfo: {
    loginId: string;
    password: string;
    name: string;
    email?: string;
    phone?: string;
    deptId: string;
    phaseId: string;
  };

  thesisTitle: string;
}

export interface SelectedProfessor {
  profId: string | null;
  deptId: string | null;
}
