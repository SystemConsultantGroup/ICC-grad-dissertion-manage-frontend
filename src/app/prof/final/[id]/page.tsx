import PageHeader from "@/components/common/PageHeader";
import { ThesisInfo } from "@/components/pages/review/ThesisInfo";
import { ReviewCard } from "@/components/pages/review/Review/ReviewCard";
import { ThesisInfoData } from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { ReviewList } from "@/components/pages/review/Review";
import { AuthSSR } from "@/api/AuthSSR";
import { FinalReviewResponse } from "@/api/_types/reviews";
import { API_ROUTES } from "@/api/apiRoute";
import { fetcher } from "@/api/fetcher";
import { ProfessorFinalForm } from "./ProfessorFinalForm";
import { ProfessorFinalResult } from "./ProfessorFinalResult";

export default async function ProfessorFinalPage({
  params: { id: reviewId },
}: {
  params: { id: string };
}) {
  const { token } = await AuthSSR({ userType: "PROFESSOR" });
  const final = (await fetcher({
    url: API_ROUTES.review.final.get(reviewId),
    token,
  })) as FinalReviewResponse;
  const review = final.finalReview;
  const thesisInfo: ThesisInfoData = {
    title: review.title,
    stage: review.stage,
    studentInfo: {
      name: review.student,
      department: { name: review.department },
    },
    abstract: review.abstract,
    thesisFile: review.thesisFiles.find((file) => file.type === "THESIS")?.file,
    presentationFile: review.thesisFiles.find((file) => file.type === "PRESENTATION")?.file,
  };
  const isPermanent = review.status === "PASS" || review.status === "FAIL";

  return (
    <>
      <PageHeader title="최종 판정" />
      <ReviewCard>
        <ThesisInfo thesis={thesisInfo} isAdvisor />
        {final.otherReviews && (
          <ReviewList
            title="심사 의견"
            stage={review.stage}
            reviews={final.otherReviews.map((other, index) => ({
              id: index,
              reviewer: { name: other.name },
              contentStatus: other.contentResult,
              presentationStatus: other.presentationResult,
              comment: other.comment,
              file: other.file,
            }))}
          />
        )}
        {!isPermanent ? (
          <ProfessorFinalForm reviewId={reviewId} thesisInfo={thesisInfo} previous={review} />
        ) : (
          <ProfessorFinalResult previous={review} />
        )}
      </ReviewCard>
    </>
  );
}
