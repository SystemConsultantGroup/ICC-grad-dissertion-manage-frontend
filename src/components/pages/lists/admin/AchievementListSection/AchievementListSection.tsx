/* api 연결 필요 */

"use client";

import { ActionIcon, Button, Center, Group, Popover, Select, Stack } from "@mantine/core";
import { Table } from "@/components/common/Table";
import { IconDownload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DepartmentSelect } from "@/components/common/selects/DepartmentSelect";
import Pagination from "@/components/common/Pagination";
import { ACHIEVEMENT_TABLE_HEADERS } from "../../_constants/table";

function AchievementListSection() {
  const { push } = useRouter();

  return (
    <Stack>
      <SectionHeader withSearchBar={false}>
        <SectionHeader.Buttons>
          <Group>
            <Popover width={200} position="bottom" withArrow shadow="md">
              <Popover.Target>
                <ActionIcon variant="outline" color="blue">
                  <IconDownload size={16} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <Stack>
                  <Button
                    onClick={() => {
                      // handleDownloadStudentExcel("all");
                    }}
                  >
                    전체 목록 엑셀 저장
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      // handleDownloadStudentExcel("filtered");
                    }}
                  >
                    필터 목록 엑셀 저장
                  </Button>
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </Group>
        </SectionHeader.Buttons>
      </SectionHeader>
      <Table headers={ACHIEVEMENT_TABLE_HEADERS} h={650}>
        {/* 필터 영역 */}
        <Table.FilterRow>
          <Table.Data>필터</Table.Data>
          <Table.Data>
            <DepartmentSelect w={150} placeholder="전공" allowDeselect />
          </Table.Data>
          <Table.Data>
            <Table.TextInput w={80} placeholder="저자" />
          </Table.Data>
          <Table.Data>
            <Table.TextInput w={250} placeholder="논문 제목" />
          </Table.Data>
          <Table.Data>
            <Table.TextInput w={100} placeholder="실적 구분" />
          </Table.Data>
          <Table.Data>
            <Table.TextInput w={100} placeholder="학술지명" />
          </Table.Data>
          <Table.Data>
            <Table.TextInput w={100} placeholder="ISSN" />
          </Table.Data>
          <Table.Data>
            <Table.TextInput w={150} placeholder="게재년월일" />
          </Table.Data>
          <Table.Data>
            <Select w={110} placeholder="주저자여부" />
          </Table.Data>
          <Table.Data>
            <Table.TextInput w={80} placeholder="저자수" />
          </Table.Data>
        </Table.FilterRow>
        <Table.Row>
          <Table.Data>1</Table.Data>
          <Table.Data>전자전기공학과</Table.Data>
          <Table.Data>김학생</Table.Data>
          <Table.Data>Design of Real-time SIFT Feature</Table.Data>
          <Table.Data>SCI(core)</Table.Data>
          <Table.Data>.</Table.Data>
          <Table.Data>2111-2222</Table.Data>
          <Table.Data>2016-04-02</Table.Data>
          <Table.Data>주저자</Table.Data>
          <Table.Data>5명</Table.Data>
        </Table.Row>
      </Table>
      <Center>
        <Pagination total={1} />
      </Center>
    </Stack>
  );
}

export default AchievementListSection;
