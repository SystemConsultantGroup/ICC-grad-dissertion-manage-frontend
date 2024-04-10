import PageHeader from "@/components/common/PageHeader";
import { ButtonRow, RowGroup } from "@/components/common/rows";
import {
  ThesisInfo,
  ThesisInfoData,
  ThesisRevisionInfoData,
} from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { ReviewCard } from "@/components/pages/review/Review";
import { Button } from "@mantine/core";
import Link from "next/link";
import { AuthSSR } from "@/api/AuthSSR";
import { AdminReviewResponse } from "@/api/_types/reviews";
import { API_ROUTES } from "@/api/apiRoute";
import { fetcher } from "@/api/fetcher";
import { AdminThesisInfo } from "@/components/pages/review/ThesisInfo/AdminThesisInfo";
import { AdminReviewListContent, ReviewReportAdminEditable } from "./AdminReviewContent";

export default async function AdminReviewResultPage({
  params: { thesisId },
}: {
  params: { thesisId: string };
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
  const revision: ThesisRevisionInfoData | undefined =
    data.stage === "REVISION"
      ? {
          showPresentation: true,
          revisionReport: data.thesisFiles.find((file) => file.type === "REVISION_REPORT")?.file,
        }
      : undefined;

  return (
    <>
      <PageHeader title="심사 결과" />
      <ReviewCard>
        <AdminThesisInfo thesis={thesis} revision={revision}>
          <ThesisInfo thesis={thesis} revision={revision} />
        </AdminThesisInfo>
        <AdminReviewListContent data={data} />
        <ReviewReportAdminEditable
          data={data}
          review={data.reviews.find((review) => review.isFinal)}
        />
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
