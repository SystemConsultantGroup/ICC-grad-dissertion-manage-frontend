import PageHeader from "@/components/common/PageHeader";
import { ThesisInfo } from "@/components/pages/review/ThesisInfo";
import { ReviewCard } from "@/components/pages/review/Review/ReviewCard";
import { FinalReview, ReviewList, ReviewResult } from "@/components/pages/review/Review";
import { ReviewConfirmModal } from "@/components/pages/review/ReviewConfirmModal";
import { AuthSSR } from "@/api/AuthSSR";
import { DetailedReviewResponse } from "@/api/_types/reviews";
import { API_ROUTES } from "@/api/apiRoute";
import { fetcher } from "@/api/fetcher";
import { ThesisInfoData } from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { ProfessorFinalForm } from "./ProfessorFinalForm";
import { ProfessorFinalResult } from "./ProfessorFinalResult";

export default async function ProfessorFinalPage({
  params: { id: reviewId },
}: {
  params: { id: string };
}) {
  const { token } = await AuthSSR({ userType: "PROFESSOR" });
  const review = (await fetcher({
    url: API_ROUTES.review.final.get(reviewId),
    token,
  })) as DetailedReviewResponse;
  const thesisInfo: ThesisInfoData = {
    title: review.title,
    stage: review.stage,
    studentInfo: {
      name: review.student,
      department: { name: review.department },
    },
    abstract: review.abstract,
    thesisFile: review.thesisFiles.find((file) => file.type === "THESIS")!.file,
    presentationFile: review.thesisFiles.find((file) => file.type === "PRESENTATION")!.file,
  };
  const isPermanent = review.contentStatus === "PASS" || review.contentStatus === "FAIL";

  return (
    <>
      <PageHeader title="최종 판정" />
      <ReviewCard>
        <ThesisInfo thesis={thesisInfo} isAdvisor />
        {!isPermanent ? (
          <ProfessorFinalForm reviewId={reviewId} thesisInfo={thesisInfo} previous={review} />
        ) : (
          <ProfessorFinalResult previous={review} />
        )}
        {/* <ReviewList title="심사 결과" stage="PRELIMINARY" />
        <FinalReview
          onTemporarySave={() => {}}
          onSave={() => {
            setShowConfirmDialog(true);
          }}
          status={status}
          setStatus={setStatus}
        /> */}
      </ReviewCard>
    </>
  );
}
