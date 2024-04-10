export type Stage = "PRELIMINARY" | "MAIN";

export interface AdminStudentFormInputs {
  basicInfo: {
    loginId: string;
    password: string;
    name: string;
    email?: string;
    phone?: string;
    deptId: string;
  };

  stage: Stage | null;

  thesisTitle: string;
}

export interface SelectedProfessor {
  profId: string | null;
}

export interface Reviewers {
  headReviewer: number;
  advisors: number[];
  committees: number[];
}
