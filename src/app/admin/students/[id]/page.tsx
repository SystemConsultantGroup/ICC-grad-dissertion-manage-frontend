import { AuthSSR } from "@/api/AuthSSR";
import { AdminStudentEditForm } from "@/components/pages/AdminStudentForm";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section/Section";

interface Props {
  params: {
    id: string;
  };
}

export default async function StudentRegisterPage({ params }: Props) {
  await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <PageHeader title="학생 현황 및 수정" />
      <Section>
        <AdminStudentEditForm studentId={params.id} />
      </Section>
    </>
  );
}
