import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import RevisionSubmissionForm from "@/components/pages/revision/RevisionSubmissionForm/RevisionSubmissionForm";
import { Stack } from "@mantine/core";

export default async function StudentRevisionPage() {
  await AuthSSR({ userType: "STUDENT" });
  return (
    <>
      <PageHeader title="수정사항 제출" />
      <Stack gap={11}>
        <Section>
          <RevisionSubmissionForm />
        </Section>
      </Stack>
    </>
  );
}
