import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import AchievementListSection from "@/components/pages/lists/admin/AchievementListSection/AchievementListSection";

async function AdminAchievementPage() {
  await AuthSSR({ userType: "ADMIN" });
  return (
    <>
      <PageHeader
        title="연구실적 조회"
        description="각 행을 클릭하면 상세보기 및 수정 페이지로 이동합니다."
      />
      <Section>
        <AchievementListSection />
      </Section>
    </>
  );
}

export default AdminAchievementPage;
