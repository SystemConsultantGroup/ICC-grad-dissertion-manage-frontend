import PageHeader from "@/components/common/PageHeader";
import { ButtonRow, RowGroup } from "@/components/common/rows";
import { ThesisInfoData } from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { ReviewCard, ReviewList } from "@/components/pages/review/Review";
import { ReviewReportAdmin } from "@/components/pages/review/Review/ReviewReport";
import { Button } from "@mantine/core";
import Link from "next/link";
import { AuthSSR } from "@/api/AuthSSR";
import { AdminReviewResponse } from "@/api/_types/reviews";
import { API_ROUTES } from "@/api/apiRoute";
import { fetcher } from "@/api/fetcher";
import { AdminThesisInfo } from "@/components/pages/review/ThesisInfo/AdminThesisInfo";

export default async function AdminReviewResultPage({
  params: { id: thesisId },
}: {
  params: { id: string };
}) {
  const { token } = await AuthSSR({ userType: "ADMIN" });

  const data = (await fetcher({
    url: API_ROUTES.review.result.get(thesisId),
    token,
  })) as AdminReviewResponse;

  const thesis: ThesisInfoData & { id: number } = {
    id: data.id,
    title: data.title,
    stage: data.stage,
    studentInfo: {
      name: data.student,
      department: { name: data.department },
    },
    abstract: data.abstract,
    thesisFile: data.thesisFiles.find((file) => file.type === "THESIS")?.file,
    presentationFile: data.thesisFiles.find((file) => file.type === "PRESENTATION")?.file,
  };

  return (
    <>
      <PageHeader title="심사 결과" />
      <ReviewCard>
        <AdminThesisInfo
          thesis={thesis}
          revision={
            data.stage === "REVISION"
              ? {
                  showPresentation: true,
                  revisionReport: data.thesisFiles.find((file) => file.type === "REVISION_REPORT")
                    ?.file,
                }
              : undefined
          }
        />
        <ReviewList
          // 아무리 봐도 result 페이지에서 이걸 표시하는 건 좀 아닌 것 같아요...
          title={data.stage === "REVISION" ? "수정지시사항 확인 결과" : "심사 결과"}
          stage={data.stage}
          reviews={data.reviews.filter((review) => !review.isFinal)}
        />
        <ReviewReportAdmin review={data.reviews.find((review) => review.isFinal)} />
        <RowGroup withBorderBottom={false}>
          <ButtonRow
            buttons={[
              <Button key="back" variant="outline" component={Link} href="../results">
                목록으로
              </Button>,
            ]}
          />
        </RowGroup>
      </ReviewCard>
    </>
  );
}
