"use client";

import PageHeader from "@/components/common/PageHeader";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo";
import { ExamineCard } from "@/components/pages/review/Review/ExamineCard";
import { ExamineResult, FinalExamine } from "@/components/pages/review/Review";
import { ReviewResultList } from "@/components/pages/review/ReviewResult/ReviewResultList";
import { useState } from "react";
import { ReviewConfirmModal } from "@/components/pages/review/ReviewConfirm";

export default function FinalExaminePage() {
  // 예시 코드
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  return (
    <>
      <PageHeader title="최종 판정" />
      <ExamineCard>
        <ArticleInfo />
        <ReviewResultList />
        <FinalExamine
          onTemporarySave={() => {}}
          onSave={() => {
            setShowConfirmDialog(true);
          }}
        />
      </ExamineCard>
      <ReviewConfirmModal
        opened={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
        }}
      >
        <ArticleInfo simple />
        <ExamineResult />
      </ReviewConfirmModal>
    </>
  );
}
