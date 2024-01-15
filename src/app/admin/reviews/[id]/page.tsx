/* api 연결 필요 */
import PageHeader from "@/components/common/PageHeader";
import { ButtonRow, RowGroup } from "@/components/common/rows";
import { ArticleInfo } from "@/components/pages/review/ArticleInfo/ArticleInfo";
import { ReviewCard, ReviewList } from "@/components/pages/review/Review";
import { Button } from "@mantine/core";
import Link from "next/link";

export default function AdminReviewPage({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <PageHeader title="심사 현황" />
      <ReviewCard>
        <ArticleInfo stage="MAIN" />
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
