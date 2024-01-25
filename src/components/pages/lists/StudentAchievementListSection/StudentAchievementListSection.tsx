/* api 연결 필요 */

"use client";

import { Button, Group, Stack } from "@mantine/core";
import { Table } from "@/components/common/Table";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MOCKUP_ACHIEVEMENT_LIST } from "@/mockups/achievement";
import { useState } from "react";
import { PAGE_SIZES } from "@/constants/pageSize";
import {
  ACHIEVEMENT_AUTHOR_TYPE_LOOKUP_TABLE,
  ACHIEVEMENT_TYPE_LOOKUP_TABLE,
} from "@/api/_types/achievement";
import { STUDENT_ACHIEVEMENT_TABLE_HEADERS } from "../_constants/table";

function StudentAchievementListSection() {
  const { push } = useRouter();
  const [pageSize, setPageSize] = useState<string | null>(String(PAGE_SIZES[0]));
  const [pageNumber, setPageNumber] = useState(1);
  const pageSizeNumber = Number(pageSize);

  const data = MOCKUP_ACHIEVEMENT_LIST;
  const pageData = {
    pageNumber: data.pageNumber,
    pageSize: data.pageSize,
    totalCount: data.totalCount,
    totalPages: data.totalPages,
  };
  const achievements = data.content;
  return (
    <Stack>
      <Group justify="right">
        <Button size="xs" leftSection={<IconPlus />} component={Link} href="achievement/register">
          실적 등록
        </Button>
      </Group>
      <Table headers={STUDENT_ACHIEVEMENT_TABLE_HEADERS}>
        {achievements?.map((achievement, index) => (
          <Table.Row
            key={achievement.id}
            onClick={() => {
              push(`professors/${achievement.id}`);
            }}
          >
            <Table.Data>{index + 1 + (pageNumber - 1) * pageSizeNumber}</Table.Data>
            <Table.Data>{achievement.paperTitle}</Table.Data>
            <Table.Data>{ACHIEVEMENT_TYPE_LOOKUP_TABLE[achievement.performance]}</Table.Data>
            <Table.Data>{achievement.journalName}</Table.Data>
            <Table.Data>{achievement.ISSN}</Table.Data>
            <Table.Data>
              {new Date(achievement.publicationDate).toLocaleDateString("ko-KR")}
            </Table.Data>
            <Table.Data>{ACHIEVEMENT_AUTHOR_TYPE_LOOKUP_TABLE[achievement.authorType]}</Table.Data>
            <Table.Data>{achievement.authorNumbers}</Table.Data>
          </Table.Row>
        ))}
      </Table>
    </Stack>
  );
}

export default StudentAchievementListSection;
