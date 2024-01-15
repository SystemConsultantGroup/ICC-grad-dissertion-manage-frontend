/* api 연결 필요 */
import PageHeader from "@/components/common/PageHeader";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo/ArticleInfo";
import { ReviewCard, ReviewList } from "@/components/pages/review/Review";
import { ReviewReportAdmin } from "@/components/pages/review/Review/ReviewReport";

export default function AdminReviewResultPage({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title="심사 결과" />
      <ReviewCard>
        <ArticleInfo stage="MAIN" revision />
        <ReviewList title="심사 결과" stage="MAIN" />
        <ReviewReportAdmin />
      </ReviewCard>
    </>
  );
}
