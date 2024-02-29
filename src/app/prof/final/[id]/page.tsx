import PageHeader from "@/components/common/PageHeader";
import { ThesisInfo } from "@/components/pages/review/ThesisInfo";
import { ReviewCard } from "@/components/pages/review/Review/ReviewCard";
import { AuthSSR } from "@/api/AuthSSR";
import { DetailedReviewResponse } from "@/api/_types/reviews";
import { API_ROUTES } from "@/api/apiRoute";
import { fetcher } from "@/api/fetcher";
import { ThesisInfoData } from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { withinPhase } from "@/api/_utils/withinPhase";
import { PhaseReadyAlertRow } from "@/components/pages/PhaseReady";
import { formatTime } from "@/components/common/Clock/date/format";
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
    thesisFile: review.thesisFiles.find((file) => file.type === "THESIS")?.file,
    presentationFile: review.thesisFiles.find((file) => file.type === "PRESENTATION")?.file,
  };
  const isPermanent = review.status === "PASS" || review.status === "FAIL";

  const { within, start, end } = await withinPhase({
    title: thesisInfo.stage === "PRELIMINARY" ? "예심 최종 심사" : "본심 최종 심사",
    token,
  });

  return (
    <>
      <PageHeader title="최종 판정" />
      <ReviewCard>
        {!within && (
          <PhaseReadyAlertRow title="최종 판정" start={formatTime(start)} end={formatTime(end)} />
        )}
        <ThesisInfo thesis={thesisInfo} isAdvisor />
        {!isPermanent ? (
          <ProfessorFinalForm
            reviewId={reviewId}
            thesisInfo={thesisInfo}
            previous={review}
            within={within}
          />
        ) : (
          <ProfessorFinalResult previous={review} />
        )}
      </ReviewCard>
    </>
  );
}
