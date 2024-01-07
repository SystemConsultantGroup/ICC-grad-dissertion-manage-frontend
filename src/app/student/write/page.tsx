import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import PaperSubmissionForm from "@/components/pages/PaperSubmissionForm/PaperSubmissionForm";

export default async function StudentWritePage() {
  await AuthSSR({ userType: "STUDENT" });

  return (
    <>
      <PageHeader title="논문 투고" />
      <Section>
        <PaperSubmissionForm />
      </Section>
    </>
  );
}
