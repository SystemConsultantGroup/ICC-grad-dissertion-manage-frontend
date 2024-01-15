/* api 연결 필요 */

"use client";

import PageHeader from "@/components/common/PageHeader";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo";
import { StudentReviewResult } from "@/components/pages/review/Review";
import { ReviewCard } from "@/components/pages/review/Review/ReviewCard";

export default function StudentResultPage() {
  return (
    <>
      <PageHeader title="심사 결과" />
      <ReviewCard>
        <ArticleInfo />
        <StudentReviewResult />
      </ReviewCard>
    </>
  );
}
