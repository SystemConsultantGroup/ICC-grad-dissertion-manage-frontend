/* api 연결 필요 */

"use client";

import PageHeader from "@/components/common/PageHeader";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo";
import { ReviewCard } from "@/components/pages/review/Review/ReviewCard";
import { ReviewResult, ProfessorReview } from "@/components/pages/review/Review";
import { ReviewConfirmModal } from "@/components/pages/review/ReviewConfirm/ReviewConfirmModal";
import { useState } from "react";

export default function ProfessorReviewPage() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // 예시 코드

  return (
    <>
      <PageHeader title="논문 심사" />
      <ReviewCard>
        <ArticleInfo stage="PRELIMINARY" isAdvisor />
        <ProfessorReview
          onTemporarySave={() => {}}
          onSave={() => {
            setShowConfirmDialog(true);
          }}
          stage="MAIN"
        />
      </ReviewCard>
      <ReviewConfirmModal
        opened={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
        }}
      >
        <ArticleInfo simple stage="MAIN" />
        <ReviewResult />
      </ReviewConfirmModal>
    </>
  );
}
