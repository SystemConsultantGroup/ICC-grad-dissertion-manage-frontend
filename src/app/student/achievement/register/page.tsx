import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import AchievementRegisterSection from "@/components/pages/achievement/AchievementRegisterSection";

async function StudentAchievementRegisterPage() {
  await AuthSSR({ userType: "STUDENT" });
  return (
    <>
      <PageHeader title="연구실적 등록" />
      <Section>
        <AchievementRegisterSection />
      </Section>
    </>
  );
}

export default StudentAchievementRegisterPage;
