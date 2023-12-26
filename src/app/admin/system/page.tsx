import PageHeader from "@/components/PageHeader";
import { AuthSSR } from "@/components/AuthSSR";
import SystemSection from "@/components/pages/SystemSection/SystemSection";

export default async function SystemPage() {
  await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <PageHeader title="시스템 일정 관리" />
      <SystemSection />
    </>
  );
}
