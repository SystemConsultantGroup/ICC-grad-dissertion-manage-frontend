"use client";

// "use client": 테스트용으로 임시로 삽입했으니 실제 페이지에서는 빼도 됩니다

import PageHeader from "@/components/common/PageHeader";
import { ReviewResultCard } from "@/components/pages/review/ReviewResult";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo/ArticleInfo";
import { ReviewReportAdmin } from "@/components/pages/review/ReviewResult/ReviewReport";
import { ReviewResultList } from "@/components/pages/review/ReviewResult/ReviewResultList";

export default function AdminExamine({ params: { id } }: { params: { id: string } }) {
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
