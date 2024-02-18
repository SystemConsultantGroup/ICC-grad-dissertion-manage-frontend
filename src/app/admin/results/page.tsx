import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import Section from "@/components/common/Section/Section";
import { ReviewResultListSection } from "@/components/pages/lists/admin/ReviewResultListSection";

export default async function AdminReviewResultsPage() {
  await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <PageHeader title="심사 결과" description="각 행을 클릭하면 상세보기 페이지로 이동합니다." />
      <Section>
        <ReviewResultListSection />
      </Section>
    </>
  );
}
