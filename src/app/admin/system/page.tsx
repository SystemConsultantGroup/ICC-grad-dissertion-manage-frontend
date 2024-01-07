import PageHeader from "@/components/common/PageHeader";
import { AuthSSR } from "@/api/AuthSSR";
import SystemSection from "@/components/pages/system/SystemSection";

export default async function SystemPage() {
  await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <PageHeader title="시스템 일정 관리" />
      <SystemSection />
    </>
  );
}
