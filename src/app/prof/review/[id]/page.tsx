"use client";

// "use client": 테스트용으로 임시로 삽입했으니 실제 페이지에서는 빼도 됩니다

import PageHeader from "@/components/common/PageHeader";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo";
import { ExamineCard } from "@/components/pages/review/Review/ExamineCard";
import { ExamineResult, ProfessorExamine } from "@/components/pages/review/Review";
import { ReviewConfirmModal } from "@/components/pages/review/ReviewConfirm/ReviewConfirmModal";
import { useState } from "react";

export default function ProfessorExaminePage() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // 예시 코드

  return (
    <>
      <PageHeader title="논문 심사" />
      <ExamineCard>
        <ArticleInfo />
        <ProfessorExamine
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
