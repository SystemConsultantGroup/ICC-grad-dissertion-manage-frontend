import PageHeader from "@/components/common/PageHeader";
import { ThesisInfo } from "@/components/pages/review/ThesisInfo";
import { ReviewCard } from "@/components/pages/review/Review";
import { ThesisInfoData } from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { AuthSSR } from "@/api/AuthSSR";
import { fetcher } from "@/api/fetcher";
import { API_ROUTES } from "@/api/apiRoute";
import { DetailedRevisionResponse } from "@/api/_types/reviews";
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

  return (
    <>
      <PageHeader title="수정사항 확인" />
      <ReviewCard>
        <ThesisInfo thesis={thesisInfo} revision={revision} isAdvisor />
        {/* {!isPermanent ? <RevisionCheckForm /> : <RevisionCheckResult />} */}
        <RevisionCheckForm revisionId={reviewId} thesisInfo={thesisInfo} previous={revision} />
      </ReviewCard>
    </>
  );
}
