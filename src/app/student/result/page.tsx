"use client";

import PageHeader from "@/components/common/PageHeader";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo";
import { StudentExamineResult } from "@/components/pages/review/Review";
import { ExamineCard } from "@/components/pages/review/Review/ExamineCard";

export default function StudentResultPage() {
  return (
    <>
      <PageHeader title="심사 결과" />
      <ExamineCard>
        <ArticleInfo />
        <StudentExamineResult />
      </ExamineCard>
    </>
  );
}
