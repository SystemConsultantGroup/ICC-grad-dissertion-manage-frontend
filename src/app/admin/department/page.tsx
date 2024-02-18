import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import DepartmentManageSection from "@/components/pages/department/DepartmentManageSection";

export default async function DepartmentPage() {
  await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <PageHeader title="학과 관리" />
      <DepartmentManageSection />
    </>
  );
}
