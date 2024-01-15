/* api 연결 필요 */

"use client";

import PageHeader from "@/components/common/PageHeader";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo";
import { ReviewCard } from "@/components/pages/review/Review/ReviewCard";
import { ReviewResult, ProfessorReview } from "@/components/pages/review/Review";
import { ReviewConfirmModal } from "@/components/pages/review/ReviewConfirmModal/ReviewConfirmModal";
import { useState } from "react";

export default function ProfessorReviewPage() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  return (
    <>
      <PageHeader title="논문 심사" />
      <ReviewCard>
        <ArticleInfo stage="MAIN" isAdvisor />
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
        <ReviewResult stage="MAIN" />
      </ReviewConfirmModal>
    </>
  );
}
