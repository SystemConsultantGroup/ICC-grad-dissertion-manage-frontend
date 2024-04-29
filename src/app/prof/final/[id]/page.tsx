import PageHeader from "@/components/common/PageHeader";
import { ThesisInfo } from "@/components/pages/review/ThesisInfo";
import { ReviewCard } from "@/components/pages/review/Review/ReviewCard";
import { ThesisInfoData } from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { ReviewList } from "@/components/pages/review/Review";
import { AuthSSR } from "@/api/AuthSSR";
import { FinalReviewResponse } from "@/api/_types/reviews";
import { API_ROUTES } from "@/api/apiRoute";
import { fetcher } from "@/api/fetcher";
import { checkPhase } from "@/api/_utils/checkPhase";
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

  const { within, start, end } = await checkPhase({
    title: thesisInfo.stage === "PRELIMINARY" ? "예심 최종 심사" : "본심 최종 심사",
    token,
  });

  return (
    <>
      <PageHeader
        title="최종 판정"
        description="서명 파일 미 업로드 시 서명이 없는 보고서가 생성됩니다."
      />
      <ReviewCard>
        {!within && (
          <PhaseReadyAlertRow title="최종 판정" start={formatTime(start)} end={formatTime(end)} />
        )}
        <ThesisInfo thesis={thesisInfo} isAdvisor />
        {final.otherReviews && (
          <ReviewList
            title={review.stage === "REVISION" ? "수정지시사항 확인 현황" : "심사 의견"}
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
