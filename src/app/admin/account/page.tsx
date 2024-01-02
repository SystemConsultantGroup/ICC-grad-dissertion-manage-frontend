import PageHeader from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import AdminInfoEditSection from "@/components/pages/account/AdminInfoEditSection";

function AdminInfoPage() {
  return (
    <>
      <PageHeader title="관리자 정보 수정" description="관리자 정보 수정 페이지" />
      <Section>
        <AdminInfoEditSection />
      </Section>
    </>
  );
}

export default AdminInfoPage;
