import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import AchievementEditSection from "@/components/pages/achievement/AchievementEditSection";

function StudentAchievementPage() {
  return (
    <>
      <PageHeader title="연구실적 상세보기" />
      <Section>
        <AchievementEditSection />
      </Section>
    </>
  );
}

export default StudentAchievementPage;
