import { ReviewerRole, Professor } from "@/api/_types/professors";
import { useState } from "react";
import { SelectedProfessor } from "../_types/AdminStudentForm";

const useReviewersAssign = () => {
  const [headReviewer, setHeadReviewer] = useState<SelectedProfessor | null>(null);
  const [advisors, setAdvisors] = useState<SelectedProfessor[]>([]);
  const [committees, setCommittees] = useState<SelectedProfessor[]>([]);

  const handleReviewerCancel = (role: ReviewerRole, cancelReviewerId: string) => {
    switch (role) {
      case "HEAD":
        setHeadReviewer(null);
        break;
      case "ADVISOR":
        setAdvisors((prev) => prev.filter((advisor) => advisor.profId !== cancelReviewerId));
        break;
      case "COMMITTEE":
        setCommittees((prev) => prev.filter((committee) => committee.profId !== cancelReviewerId));
        break;
    }
  };

  const handleReviewerAdd = (role: ReviewerRole, deptId: string, profId: string) => {
    switch (role) {
      case "HEAD":
        setHeadReviewer({ deptId, profId });
        break;
      case "ADVISOR":
        setAdvisors((prev) => [...prev, { deptId, profId }]);
        break;
      case "COMMITTEE":
        setCommittees((prev) => [...prev, { deptId, profId }]);
        break;
    }
  };

  const handleReviewersSet = (role: ReviewerRole, reviewers: Professor[]) => {
    switch (role) {
      case "ADVISOR":
        setAdvisors(
          reviewers.map((advisor: Professor) => ({
            deptId: String(advisor.department.id),
            profId: String(advisor.id),
          }))
        );
        break;
      case "COMMITTEE":
        setCommittees(
          reviewers.map((committee: Professor) => ({
            deptId: String(committee.department.id),
            profId: String(committee.id),
          }))
        );
        break;
    }
  };

  return {
    headReviewer,
    advisors,
    committees,
    handleReviewerCancel,
    handleReviewerAdd,
    handleReviewersSet,
  };
};

export default useReviewersAssign;
