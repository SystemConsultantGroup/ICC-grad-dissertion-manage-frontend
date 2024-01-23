import { AuthSSR } from "@/api/AuthSSR";
import AdminProfForm from "@/components/pages/AdminProfForm/AdminProfForm";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section/Section";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProfEditPage({ params }: Props) {
  await AuthSSR({ userType: "ADMIN" });

  const { id } = params;

  return (
    <>
      <PageHeader title="교수 현황 및 수정" />
      <Section>
        <AdminProfForm professorId={id} />
      </Section>
    </>
  );
}
