import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import AchievementEditSection from "@/components/pages/achievement/AchievementEditSection";

interface Props {
  params: {
    id: string;
  };
}

async function AdminAchievementPage({ params: { id } }: Props) {
  await AuthSSR({ userType: "ADMIN" });
  return (
    <>
      <PageHeader
        title="연구실적 조회"
        description="각 행을 클릭하면 상세보기 및 수정 페이지로 이동합니다."
      />
      <Section>
        <AchievementEditSection id={id} />
      </Section>
    </>
  );
}

export default AdminAchievementPage;
