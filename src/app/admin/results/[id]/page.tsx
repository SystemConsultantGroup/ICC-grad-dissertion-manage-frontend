/* api 연결 필요 */
import PageHeader from "@/components/common/PageHeader";
import { ButtonRow, RowGroup } from "@/components/common/rows";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo/ArticleInfo";
import { ReviewCard, ReviewList } from "@/components/pages/review/Review";
import { ReviewReportAdmin } from "@/components/pages/review/Review/ReviewReport";
import { Button } from "@mantine/core";
import Link from "next/link";

export default function AdminReviewResultPage({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title="심사 결과" />
      <ReviewCard>
        <ArticleInfo stage="MAIN" revision />
        <ReviewList title="심사 결과" stage="MAIN" />
        <ReviewReportAdmin />
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
