import { Button } from "@mantine/core";
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import { ButtonRow, RowGroup } from "@/components/common/rows";
import { ThesisInfo, ThesisInfoData } from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { ReviewCard } from "@/components/pages/review/Review";
import { AuthSSR } from "@/api/AuthSSR";
import { API_ROUTES } from "@/api/apiRoute";
import { AdminReviewResponse } from "@/api/_types/reviews";
import { fetcher } from "@/api/fetcher";
import { AdminThesisInfo } from "@/components/pages/review/ThesisInfo/AdminThesisInfo";
import { AdminReviewListContent } from "./AdminReviewListContent";

export default async function AdminReviewPage({
  params: { thesisId },
}: {
  params: { thesisId: string };
}) {
  const { token } = await AuthSSR({ userType: "ADMIN" });

  const data = (await fetcher({
    url: API_ROUTES.review.current.get(thesisId),
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
      <PageHeader title="심사 현황" />
      <ReviewCard>
        <AdminThesisInfo thesis={thesis}>
          <ThesisInfo thesis={thesis} />
        </AdminThesisInfo>
        <AdminReviewListContent data={data} />
        <RowGroup withBorderBottom={false}>
          <ButtonRow
            buttons={[
              <Button key="back" variant="outline" component={Link} href="../reviews">
                목록으로
              </Button>,
            ]}
          />
        </RowGroup>
      </ReviewCard>
    </>
  );
}
