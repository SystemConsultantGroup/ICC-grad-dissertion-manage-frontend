import PageHeader from "@/components/common/PageHeader";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo";
import { ExamineCard } from "@/components/pages/review/Review/ExamineCard";
import { FinalExamine } from "@/components/pages/review/Review";
import { ReviewResultList } from "@/components/pages/review/ReviewResult/ReviewResultList";

export default function FinalExaminePage() {
  // 예시 코드

  return (
    <>
      <PageHeader title="최종 판정" />
      <ExamineCard>
        <ArticleInfo />
        <ReviewResultList />
        <FinalExamine />
      </ExamineCard>
    </>
  );
}
