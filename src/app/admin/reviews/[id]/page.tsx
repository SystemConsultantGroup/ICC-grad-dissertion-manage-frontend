/* api 연결 필요 */
import { AuthSSR } from "@/api/AuthSSR";
import PageHeader from "@/components/common/PageHeader";
import { ButtonRow, RowGroup } from "@/components/common/rows";
import { ThesisInfo } from "@/components/pages/review/ThesisInfo/ThesisInfo";
import { ReviewCard, ReviewList } from "@/components/pages/review/Review";
import { Button } from "@mantine/core";
import Link from "next/link";

export default async function AdminReviewPage({ params: { id } }: { params: { id: string } }) {
  await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <PageHeader title="심사 현황" />
      <ReviewCard>
        <ThesisInfo stage="MAIN" />
        <ReviewList title="심사 현황" stage="MAIN" />
        <RowGroup withBorderBottom={false}>
          <ButtonRow
            buttons={[
              <Button key="back" variant="outline" component={Link} href="../reviews">
                목록으로
              </Button>,
            ]}
          />
        </RowGroup>
      </ReviewCard>
    </>
  );
}
