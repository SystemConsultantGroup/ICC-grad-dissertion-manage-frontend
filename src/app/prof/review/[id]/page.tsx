import PageHeader from "@/components/common/PageHeader";
import { ThesisInfo } from "@/components/pages/review/ThesisInfo";
import { ReviewCard } from "@/components/pages/review/Review/ReviewCard";
import { DetailedReviewResponse } from "@/api/_types/reviews";
import { API_ROUTES } from "@/api/apiRoute";
import { ThesisInfoData } from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { fetcher } from "@/api/fetcher";
import { AuthSSR } from "@/api/AuthSSR";
import { checkPhase } from "@/api/_utils/checkPhase";
import { formatTime } from "@/components/common/Clock/date/format";
import { PhaseReadyAlertRow } from "@/components/pages/PhaseReady";
import { ProfessorReviewForm } from "./ProfessorReviewForm";
import { ProfessorReviewResult } from "./ProfessorReviewResult";

export default async function ProfessorReviewPage({
  params: { id: reviewId },
}: {
  params: { id: string };
}) {
  const { token } = await AuthSSR({ userType: "PROFESSOR" });
  const review = (await fetcher({
    url: API_ROUTES.review.get(reviewId),
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
  const isPermanent =
    (review.contentStatus === "PASS" || review.contentStatus === "FAIL") &&
    (review.presentationStatus === "PASS" || review.presentationStatus === "FAIL");

  const { within, start, end } = await checkPhase({
    title: thesisInfo.stage === "PRELIMINARY" ? "예심 심사" : "본심 심사",
    token,
  });
  return (
    <>
      <PageHeader
        title="논문 심사"
        description="서명 파일 미 업로드 시 서명이 없는 보고서가 생성됩니다."
      />
      <ReviewCard>
        {!within && (
          <PhaseReadyAlertRow title="논문 심사" start={formatTime(start)} end={formatTime(end)} />
        )}
        <ThesisInfo thesis={thesisInfo} reviewerRole={review.reviewerRole} />
        {!isPermanent ? (
          <ProfessorReviewForm
            reviewId={reviewId}
            thesisInfo={thesisInfo}
            previous={review}
            within={within}
          />
        ) : (
          <ProfessorReviewResult previous={review} />
        )}
      </ReviewCard>
    </>
  );
}
