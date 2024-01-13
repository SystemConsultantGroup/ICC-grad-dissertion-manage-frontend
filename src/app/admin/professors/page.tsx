import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section/Section";
import { ProfessorListSection } from "@/components/pages/lists/admin/ProfessorListSection";

export default async function ProfessorsPage() {
  await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <PageHeader
        title="교수 현황 및 수정"
        description="각 행을 클릭하면 상세보기 및 수정 페이지로 이동합니다."
      />
      <Section>
        <ProfessorListSection />
      </Section>
    </>
  );
}
