/* api 연결 필요 */

"use client";

import PageHeader from "@/components/common/PageHeader";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo";
import { ReviewCard, RevisionCheck } from "@/components/pages/review/Review";
import { useState } from "react";

function ProfessorRevisionPage() {
  const [checked, setChecked] = useState<boolean>();

  return (
    <>
      <PageHeader title="수정사항 확인" />
      <ReviewCard>
        <ArticleInfo isAdvisor revision />
        <RevisionCheck checked={checked} setChecked={setChecked} />
      </ReviewCard>
    </>
  );
}

export default ProfessorRevisionPage;
