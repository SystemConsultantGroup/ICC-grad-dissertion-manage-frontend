/* api 연결 필요 */

"use client";

import { Button, Group, Stack } from "@mantine/core";
import { Table } from "@/components/common/Table";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { STUDENT_ACHIEVEMENT_TABLE_HEADERS } from "../_constants/table";

function StudentAchievementListSection() {
  const { push } = useRouter();

  return (
    <Stack>
      <Group justify="right">
        <Button size="xs" leftSection={<IconPlus />} component={Link} href="achievement/register">
          실적 등록
        </Button>
      </Group>
      <Table headers={STUDENT_ACHIEVEMENT_TABLE_HEADERS}>
        <Table.Row
          onClick={() => {
            push(`achievement/1`);
          }}
        >
          <Table.Data>1</Table.Data>
          <Table.Data>test</Table.Data>
          <Table.Data>SCI(Core)</Table.Data>
          <Table.Data>.</Table.Data>
          <Table.Data>1111-2222</Table.Data>
          <Table.Data>2016-02-03</Table.Data>
          <Table.Data>제1저자</Table.Data>
          <Table.Data>2 명</Table.Data>
        </Table.Row>
      </Table>
    </Stack>
  );
}

export default StudentAchievementListSection;
