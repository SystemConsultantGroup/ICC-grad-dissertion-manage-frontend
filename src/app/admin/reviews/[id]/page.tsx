import { Button } from "@mantine/core";
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import { ButtonRow, RowGroup } from "@/components/common/rows";
import { ThesisInfo, ThesisInfoData } from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { ReviewCard, ReviewList } from "@/components/pages/review/Review";
import { AuthSSR } from "@/api/AuthSSR";
import { API_ROUTES } from "@/api/apiRoute";
import { AdminReviewResponse } from "@/api/_types/reviews";
import { fetcher } from "@/api/fetcher";

export default async function AdminReviewPage({
  params: { id: reviewId },
}: {
  params: { id: string };
}) {
  const { token } = await AuthSSR({ userType: "ADMIN" });

  const data = (await fetcher({
    url: API_ROUTES.review.current.get(reviewId),
    token,
  })) as AdminReviewResponse;
  const thesis: ThesisInfoData = {
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
        <ThesisInfo thesis={thesis} />
        <ReviewList
          title="심사 현황"
          stage={data.stage}
          reviews={data.reviews.filter((review) => !review.isFinal)}
        />
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