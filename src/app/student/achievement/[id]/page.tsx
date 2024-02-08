import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import AchievementEditSection from "@/components/pages/achievement/AchievementEditSection";

interface Props {
  params: {
    id: string;
  };
}

function StudentAchievementPage({ params: { id } }: Props) {
  return (
    <>
      <PageHeader title="연구실적 상세보기" />
      <Section>
        <AchievementEditSection id={id} />
      </Section>
    </>
  );
}

export default StudentAchievementPage;
