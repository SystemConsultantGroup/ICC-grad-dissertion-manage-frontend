import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import AchievementListSection from "@/components/pages/lists/admin/AchievementListSection/AchievementListSection";

function AdminAchievementPage() {
  return (
    <>
      <PageHeader title="연구실적 조회" description="" />
      <Section>
        <AchievementListSection />
      </Section>
    </>
  );
}

export default AdminAchievementPage;
