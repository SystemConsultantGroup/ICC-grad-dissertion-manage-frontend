import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import StudentAchievementListSection from "@/components/pages/lists/StudentAchievementListSection/StudentAchievementListSection";

function StudentAchievementPage() {
  return (
    <>
      <PageHeader
        title="연구실적"
        description="각 행을 클릭하면 상세보기 및 수정 페이지로 이동합니다."
      />
      <Section>
        <StudentAchievementListSection />
      </Section>
    </>
  );
}

export default StudentAchievementPage;
