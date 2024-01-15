/* api 연결 필요 */
import PageHeader from "@/components/common/PageHeader";
import { ReviewResultCard } from "@/components/pages/review/ReviewResult";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo/ArticleInfo";
import { ReviewReportAdmin } from "@/components/pages/review/ReviewResult/ReviewReport";
import { ReviewResultList } from "@/components/pages/review/ReviewResult/ReviewResultList";

export default function AdminReviewPage({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title="심사 결과" />
      <ReviewResultCard>
        <ArticleInfo stage="MAIN" />
        <ReviewResultList />
        <ReviewReportAdmin />
      </ReviewResultCard>
    </>
  );
}
