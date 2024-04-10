import { ReviewerRole, Professor } from "@/api/_types/professors";
import { useRef, useState } from "react";
import { Reviewers, SelectedProfessor } from "../_types/AdminStudentForm";

const useReviewersAssign = () => {
  const [headReviewer, setHeadReviewer] = useState<SelectedProfessor | null>(null);
  const [advisors, setAdvisors] = useState<SelectedProfessor[]>([]);
  const [committees, setCommittees] = useState<SelectedProfessor[]>([]);

  const prevReviewersRef = useRef<Reviewers>();

  const handleReviewerCancel = (
    role: ReviewerRole,
    cancelReviewerId: string,
    clearSelectedReviewer: (isCancle: boolean, role?: ReviewerRole) => void
  ) => {
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
    clearSelectedReviewer(true);
  };

  const handleReviewerAdd = (
    role: ReviewerRole,
    profId: string,
    clearSelectedReviewer: (isCancle: boolean, role?: ReviewerRole) => void
  ) => {
    switch (role) {
      case "HEAD":
        setHeadReviewer({ profId });
        clearSelectedReviewer(false, "HEAD");
        break;
      case "ADVISOR":
        setAdvisors((prev) => [...prev, { profId }]);
        clearSelectedReviewer(false, "ADVISOR");
        break;
      case "COMMITTEE":
        setCommittees((prev) => [...prev, { profId }]);
        clearSelectedReviewer(false, "COMMITTEE");
        break;
    }
  };

  const handleReviewersSet = (
    _headReviewer: Professor,
    _advisors: Professor[],
    _committees: Professor[]
  ) => {
    setHeadReviewer({
      profId: String(_headReviewer.id),
    });
    setAdvisors(
      _advisors.map((advisor: Professor) => ({
        profId: String(advisor.id),
      }))
    );
    setCommittees(
      _committees.map((committee: Professor) => ({
        profId: String(committee.id),
      }))
    );
    prevReviewersRef.current = {
      headReviewer: _headReviewer.id,
      advisors: _advisors.map((advisor) => advisor.id),
      committees: _committees.map((advisor) => advisor.id),
    };
  };

  return {
    headReviewer,
    advisors,
    committees,
    prevReviewersRef,
    handleReviewerCancel,
    handleReviewerAdd,
    handleReviewersSet,
  };
};

export default useReviewersAssign;
