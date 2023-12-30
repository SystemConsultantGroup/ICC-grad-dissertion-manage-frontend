import { AuthSSR } from "@/api/AuthSSR";
import DepartmentManageSection from "@/components/pages/department/DepartmentManageSection";

export default async function DepartmentPage() {
  await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <DepartmentManageSection />
    </>
  );
}
