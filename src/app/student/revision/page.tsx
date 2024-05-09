import { AuthSSR } from "@/api/AuthSSR";
import { UserResponse } from "@/api/_types/user";
import { checkPhase } from "@/api/_utils/checkPhase";
import { API_ROUTES } from "@/api/apiRoute";
import { fetcher } from "@/api/fetcher";
import { formatTime } from "@/components/common/Clock/date/format";
import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import PhaseReady from "@/components/pages/PhaseReady/PhaseReady";
import RevisionSubmissionForm from "@/components/pages/revision/RevisionSubmissionForm/RevisionSubmissionForm";
import { Stack } from "@mantine/core";

export default async function StudentRevisionPage() {
  const { token } = await AuthSSR({ userType: "STUDENT" });
  const { within, start, end } = await checkPhase({ title: "수정 지시 사항 제출", token });
  const user = (await fetcher({ url: API_ROUTES.user.get(), token })) as UserResponse;

  return within && user.currentPhase === "REVISION" ? (
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
