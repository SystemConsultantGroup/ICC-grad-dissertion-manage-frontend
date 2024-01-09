import { AuthSSR } from "@/api/AuthSSR";
import AdminProfForm from "@/components/pages/AdminProfForm/AdminProfForm";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section/Section";

export default async function ProfEditPage({ params }: { params: { id: string } }) {
  await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <PageHeader title="교수 현황 및 수정" />
      <Section>
        <AdminProfForm professorId={params.id} />
      </Section>
    </>
  );
}
