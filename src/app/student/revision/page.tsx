import { AuthSSR } from "@/api/AuthSSR";
import { withinPhase } from "@/api/_utils/withinPhase";
import { formatTime } from "@/components/common/Clock/date/format";
import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import PhaseReady from "@/components/pages/PhaseReady/PhaseReady";
import RevisionSubmissionForm from "@/components/pages/revision/RevisionSubmissionForm/RevisionSubmissionForm";
import { Stack } from "@mantine/core";

export default async function StudentRevisionPage() {
  const { token } = await AuthSSR({ userType: "STUDENT" });
  const { within, start, end } = await withinPhase({ title: "수정 지시 사항 제출", token });

  return within ? (
    <>
      <PageHeader title="수정사항 제출" />
      <Stack gap={11}>
        <Section>
          <RevisionSubmissionForm />
        </Section>
      </Stack>
    </>
  ) : (
    <PhaseReady title="수정사항 제출" start={formatTime(start)} end={formatTime(end)} />
  );
}
