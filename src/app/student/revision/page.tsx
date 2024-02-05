import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import RevisionSubmissionForm from "@/components/pages/revision/RevisionSubmissionForm/RevisionSubmissionForm";
import { Stack } from "@mantine/core";

export default function StudentRevisionPage() {
  return (
    <>
      <PageHeader title="수정사항 제출/확인" />
      <Stack gap={11}>
        <Section>
          <RevisionSubmissionForm />
        </Section>
      </Stack>
    </>
  );
}
