import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section/Section";
import AdminExcelRegister from "@/components/pages/AdminExcelRegister/AdminExcelRegister";

export default async function ProfExcelRegister() {
  await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <PageHeader title="교수 일괄 등록" />
      <Section>
        <AdminExcelRegister isProf />
      </Section>
    </>
  );
}
