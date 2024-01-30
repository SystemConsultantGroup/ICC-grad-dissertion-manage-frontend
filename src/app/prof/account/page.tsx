import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import UserInfoEditSection from "@/components/pages/account/UserInfoEditSection";

function ProfInfoPage() {
  return (
    <>
      <PageHeader title="회원 정보 수정" description="회원 정보 수정 페이지" />
      <Section>
        <UserInfoEditSection />
      </Section>
    </>
  );
}

export default ProfInfoPage;
