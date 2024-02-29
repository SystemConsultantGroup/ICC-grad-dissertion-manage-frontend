import { AuthSSR } from "@/api/AuthSSR";
import { withinPhase } from "@/api/_utils/withinPhase";
import { formatTime } from "@/components/common/Clock/date/format";
import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import PhaseReady from "@/components/pages/PhaseReady/PhaseReady";
import AchievementRegisterSection from "@/components/pages/achievement/AchievementRegisterSection";

async function StudentAchievementRegisterPage() {
  const { token } = await AuthSSR({ userType: "STUDENT" });
  const { within, start, end } = await withinPhase({ title: "논문 실적 제출", token });

  return within ? (
    <>
      <PageHeader title="연구실적 등록" />
      <Section>
        <AchievementRegisterSection />
      </Section>
    </>
  ) : (
    <PhaseReady title="연구 실적 등록" start={formatTime(start)} end={formatTime(end)} />
  );
}

export default StudentAchievementRegisterPage;
