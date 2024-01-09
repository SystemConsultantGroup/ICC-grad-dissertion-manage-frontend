import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { ProfReviewListSection } from "@/components/pages/lists/ProfReviewListSection";

export default async function ProfReviewPage() {
  await AuthSSR({ userType: "PROFESSOR" });

  return (
    <>
      <PageHeader title="논문 심사" description="셀을 클릭하면 심사 페이지로 이동합니다." />
      <Section>
        <ProfReviewListSection isFinal={false} />
      </Section>
    </>
  );
}
