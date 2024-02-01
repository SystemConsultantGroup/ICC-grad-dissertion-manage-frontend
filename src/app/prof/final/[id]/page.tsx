/* api 연결 필요 */

"use client";

import PageHeader from "@/components/common/PageHeader";
import { ThesisInfo } from "@/components/pages/review/ThesisInfo";
import { ReviewCard } from "@/components/pages/review/Review/ReviewCard";
import { FinalReview, ReviewList, ReviewResult } from "@/components/pages/review/Review";
import { useState } from "react";
import { ReviewConfirmModal } from "@/components/pages/review/ReviewConfirmModal";
import { Status } from "@/components/pages/review/Review/ProfessorReview";

export default function ProfessorFinalPage() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [status, setStatus] = useState<Status>(); // api로부터 default값을 지정해 주기
  return (
    <>
      <PageHeader title="최종 판정" />
      <ReviewCard>
        <ThesisInfo stage="PRELIMINARY" isAdvisor />
        <ReviewList title="심사 결과" stage="PRELIMINARY" />
        <FinalReview
          onTemporarySave={() => {}}
          onSave={() => {
            setShowConfirmDialog(true);
          }}
          status={status}
          setStatus={setStatus}
        />
      </ReviewCard>
      <ReviewConfirmModal
        opened={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
        }}
      >
        <ThesisInfo simple stage="PRELIMINARY" isAdvisor />
        <ReviewResult stage="PRELIMINARY" />
      </ReviewConfirmModal>
    </>
  );
}
