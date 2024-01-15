/* api 연결 필요 */
import PageHeader from "@/components/common/PageHeader";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo";
import { ReviewCard, RevisionCheck } from "@/components/pages/review/Review";

function ProfessorRevisionPage() {
  return (
    <>
      <PageHeader title="수정사항 확인" />
      <ReviewCard>
        <ArticleInfo isAdvisor revision />
        <RevisionCheck />
      </ReviewCard>
    </>
  );
}

export default ProfessorRevisionPage;
