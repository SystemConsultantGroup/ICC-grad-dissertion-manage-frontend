/* api 연결 필요 */

"use client";

import PageHeader from "@/components/common/PageHeader";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo";
import { ReviewCard } from "@/components/pages/review/Review/ReviewCard";
import { FinalReview, ReviewList, ReviewResult } from "@/components/pages/review/Review";
import { useState } from "react";
import { ReviewConfirmModal } from "@/components/pages/review/ReviewConfirmModal";

export default function ProfessorFinalPage() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  return (
    <>
      <PageHeader title="최종 판정" />
      <ReviewCard>
        <ArticleInfo stage="PRELIMINARY" isAdvisor />
        <ReviewList title="심사 결과" stage="PRELIMINARY" />
        <FinalReview
          onTemporarySave={() => {}}
          onSave={() => {
            setShowConfirmDialog(true);
          }}
        />
      </ReviewCard>
      <ReviewConfirmModal
        opened={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
        }}
      >
        <ArticleInfo simple stage="PRELIMINARY" isAdvisor />
        <ReviewResult stage="PRELIMINARY" />
      </ReviewConfirmModal>
    </>
  );
}
