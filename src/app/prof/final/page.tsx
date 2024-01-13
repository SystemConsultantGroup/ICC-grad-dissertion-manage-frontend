import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { ProfReviewListSection } from "@/components/pages/lists/ProfReviewListSection";

export default async function ProfFinalPage() {
  await AuthSSR({ userType: "PROFESSOR" });

  return (
    <>
      <PageHeader title="최종 판정" description="각 행을 클릭하면 심사 페이지로 이동합니다." />
      <Section>
        <ProfReviewListSection isFinal />
      </Section>
    </>
  );
}
