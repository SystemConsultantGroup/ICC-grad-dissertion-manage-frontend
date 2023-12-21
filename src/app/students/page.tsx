import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import TableTest from "./TableTest";

export default function HomePage() {
  return (
    <>
      <PageHeader
        title="학생 현황"
        description="학생을 클릭하면 자세한 사항을 확인하실 수 있습니다."
      />
      <Section>
        <TableTest />
      </Section>
    </>
  );
}
