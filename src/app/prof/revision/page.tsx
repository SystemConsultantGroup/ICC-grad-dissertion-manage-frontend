import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import ProfRevisionListSection from "@/components/pages/lists/ProfRevisionListSection/ProfRevisionListSection";

export default async function ProfRevisionListPage() {
  await AuthSSR({ userType: "PROFESSOR" });

  return (
    <>
      <PageHeader
        title="수정사항 확인"
        description="각 행을 클릭하면 상세보기 페이지로 이동합니다."
      />
      <Section>
        <ProfRevisionListSection />
      </Section>
    </>
  );
}
