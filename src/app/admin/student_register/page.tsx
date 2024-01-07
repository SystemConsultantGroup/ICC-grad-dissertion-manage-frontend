import { AuthSSR } from "@/api/AuthSSR";
import AdminStudentForm from "@/components/pages/AdminStudentForm/AdminStudentForm";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section/Section";

export default async function StudentRegisterPage() {
  //await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <PageHeader title="학생 등록" />
      <Section>
        <AdminStudentForm />
      </Section>
    </>
  );
}
