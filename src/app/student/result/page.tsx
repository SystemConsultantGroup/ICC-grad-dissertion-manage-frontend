/* api 연결 필요 */

"use client";

import PageHeader from "@/components/common/PageHeader";
import { ThesisInfo } from "@/components/pages/review/ThesisInfo";
import { ReviewList, StudentReviewResult } from "@/components/pages/review/Review";
import { ReviewCard } from "@/components/pages/review/Review/ReviewCard";

export default function StudentResultPage() {
  return (
    <>
      <PageHeader title="심사 결과" />
      <ReviewCard>
        <ThesisInfo stage="MAIN" />
        <StudentReviewResult stage="MAIN" />
        <ReviewList title="심사 의견" stage="MAIN" />
      </ReviewCard>
    </>
  );
}
