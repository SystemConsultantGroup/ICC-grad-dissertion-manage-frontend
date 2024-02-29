import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { SuccessAlert } from "@/components/common/SuccessAlert";

export default async function WriteSuccessAlertPage() {
  await AuthSSR({ userType: "STUDENT" });

  return (
    <>
      <PageHeader title="논문 투고" />
      <Section>
        <SuccessAlert message="논문이 성공적으로 투고되었습니다." />
      </Section>
    </>
  );
}
