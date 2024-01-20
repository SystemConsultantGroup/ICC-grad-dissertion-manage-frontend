import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section/Section";
import { ReviewListSection } from "@/components/pages/lists/admin/ReviewListSection";

export default async function AdminReviewsPage() {
  await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <PageHeader title="심사 현황" description="각 행을 클릭하면 상세보기 페이지로 이동합니다." />
      <Section>
        <ReviewListSection />
      </Section>
    </>
  );
}
