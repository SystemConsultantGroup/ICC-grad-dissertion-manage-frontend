import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { SuccessAlert } from "@/components/common/SuccessAlert";

export default async function RevisionSuccessAlertPage() {
  await AuthSSR({ userType: "STUDENT" });

  return (
    <>
      <PageHeader title="수정사항 제출" />
      <Section>
        <SuccessAlert message="수정사항이 성공적으로 제출되었습니다." />
      </Section>
    </>
  );
}
