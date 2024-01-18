"use client";

import PageHeader from "@/components/common/PageHeader";
import { ReviewResultCard } from "@/components/pages/review/ReviewResult";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo/ArticleInfo";
import { ReviewReportAdmin } from "@/components/pages/review/ReviewResult/ReviewReport";
import { ReviewResultList } from "@/components/pages/review/ReviewResult/ReviewResultList";

<<<<<<<< HEAD:src/app/admin/reviews/[id]/page.tsx
export default function AdminReview({ params: { id } }: { params: { id: string } }) {
========
function AdminResultPage({ params: { id } }: { params: { id: string } }) {
>>>>>>>> 211fe21ae95798b8d16a822952a3b8cc31715ff2:src/app/admin/results/[id]/page.tsx
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

export default AdminResultPage;
