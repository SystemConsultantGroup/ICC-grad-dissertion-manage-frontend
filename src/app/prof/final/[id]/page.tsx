/* api 연결 필요 */

import PageHeader from "@/components/common/PageHeader";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo";
import { ReviewCard } from "@/components/pages/review/Review/ReviewCard";
import { FinalReview } from "@/components/pages/review/Review";
import { ReviewResultList } from "@/components/pages/review/ReviewResult/ReviewResultList";

export default function ProfessorFinalPage() {
  return (
    <>
      <PageHeader title="최종 판정" />
      <ReviewCard>
        <ArticleInfo stage="PRELIMINARY" isAdvisor />
        <ReviewResultList />
        <FinalReview />
      </ReviewCard>
    </>
  );
}
