import { AuthSSR } from "@/api/AuthSSR";
import AdminProfForm from "@/components/pages/AdminProfForm/AdminProfForm";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section/Section";

export default async function ProfRegisterPage() {
  await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <PageHeader title="교수 등록" />
      <Section>
        <AdminProfForm />
      </Section>
    </>
  );
}
