import PageHeader from "@/components/common/PageHeader";
import { ThesisInfo } from "@/components/pages/review/ThesisInfo";
import { ReviewCard } from "@/components/pages/review/Review";
import { ThesisInfoData } from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { AuthSSR } from "@/api/AuthSSR";
import { fetcher } from "@/api/fetcher";
import { API_ROUTES } from "@/api/apiRoute";
import { DetailedRevisionResponse } from "@/api/_types/reviews";
import { withinPhase } from "@/api/_utils/withinPhase";
import { PhaseReadyAlertRow } from "@/components/pages/PhaseReady";
import { formatTime } from "@/components/common/Clock/date/format";
import { RevisionCheckForm } from "./RevisionCheckForm";

export default async function ProfessorRevisionPage({
  params: { id: reviewId },
}: {
  params: { id: string };
}) {
  const { token } = await AuthSSR({ userType: "PROFESSOR" });
  const revision = (await fetcher({
    url: API_ROUTES.review.revision.get(reviewId),
    token,
  })) as DetailedRevisionResponse;
  const thesisInfo: ThesisInfoData = {
    title: revision.title,
    stage: revision.stage,
    studentInfo: {
      name: revision.student,
      department: { name: revision.department },
    },
    abstract: revision.abstract,
    thesisFile: revision.thesisFiles.find((file) => file.type === "THESIS")?.file,
    presentationFile: revision.thesisFiles.find((file) => file.type === "PRESENTATION")?.file,
  };
  // const isPermanent = revision.contentStatus === "PASS" || revision.contentStatus === "FAIL";

  const { within, start, end } = await withinPhase({
    title: "수정 지시 사항 확인",
    token,
  });

  return (
    <>
      <PageHeader title="수정사항 확인" />
      <ReviewCard>
        {!within && (
          <PhaseReadyAlertRow title="논문 심사" start={formatTime(start)} end={formatTime(end)} />
        )}
        <ThesisInfo thesis={thesisInfo} revision={revision} isAdvisor />
        {/* {!isPermanent ? <RevisionCheckForm /> : <RevisionCheckResult />} */}
        <RevisionCheckForm
          revisionId={reviewId}
          thesisInfo={thesisInfo}
          previous={revision}
          within={within}
        />
      </ReviewCard>
    </>
  );
}
