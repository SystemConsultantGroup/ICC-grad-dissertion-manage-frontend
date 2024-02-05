import { AuthSSR } from "@/api/AuthSSR";
import TableTest from "@/app/admin/students/TableTest";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section/Section";

export default async function AdminStudentsPage() {
  await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <PageHeader
        title="학생 현황 및 수정"
        description="각 행을 클릭하면 상세보기 및 수정 페이지로 이동합니다."
      />
      <Section>
        <TableTest />
      </Section>
    </>
  );
}
