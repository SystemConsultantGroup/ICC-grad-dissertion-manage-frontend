import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import UserInfoEditSection from "@/components/pages/account/UserInfoEditSection";

async function ProfInfoPage() {
  await AuthSSR({ userType: "PROFESSOR" });
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
