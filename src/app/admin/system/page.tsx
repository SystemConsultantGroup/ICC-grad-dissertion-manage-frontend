import PageHeader from "@/components/common/PageHeader";
import SystemSection from "@/components/pages/SystemSection/SystemSection";
import { AuthSSR } from "@/api/AuthSSR";

export default async function SystemPage() {
  await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <PageHeader title="시스템 일정 관리" />
      <SystemSection />
    </>
  );
}
