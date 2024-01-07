"use client";

import PageHeader from "@/components/common/PageHeader";
import { ReviewResultCard } from "@/components/pages/review/ReviewResult";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo/ArticleInfo";
import { ReviewReportAdmin } from "@/components/pages/review/ReviewResult/ReviewReport";
import { ReviewResultList } from "@/components/pages/review/ReviewResult/ReviewResultList";

export default function AdminReview({ params: { id } }: { params: { id: string } }) {
  // 예시 코드
  return (
    <>
      <PageHeader title="심사 결과" />
      <ReviewResultCard>
        <ArticleInfo />
        <ReviewResultList />
        <ReviewReportAdmin />
      </ReviewResultCard>
    </>
  );
}
