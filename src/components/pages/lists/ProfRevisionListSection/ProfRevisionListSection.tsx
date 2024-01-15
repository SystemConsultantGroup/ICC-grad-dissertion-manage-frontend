"use client";

import Pagination from "@/components/common/Pagination";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ActionIcon, Button, Center, Group, Popover, Select, Stack } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Table } from "@/components/common/Table";
import { DepartmentSelect } from "@/components/common/selects/DepartmentSelect";
import { PROF_REVISION_TABLE_HEADERS } from "../_constants/table";

function ProfRevisionListSection() {
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
                      // handleDownloadReviewExcel("all");
                    }}
                  >
                    심사 목록 전체 출력
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      // handleDownloadReviewExcel("filtered");
                    }}
                  >
                    심사 목록 필터 출력
                  </Button>
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </Group>
        </SectionHeader.Buttons>
      </SectionHeader>
      <Table headers={PROF_REVISION_TABLE_HEADERS} h={650}>
        {/* 필터 영역 */}
        <Table.FilterRow>
          <Table.Data>필터</Table.Data>
          <Table.Data>
            <DepartmentSelect w="100%" miw={150} placeholder="전공" allowDeselect />
          </Table.Data>
          <Table.Data>
            <Table.TextInput w="100%" miw={80} placeholder="저자" />
          </Table.Data>
          <Table.Data>
            <Table.TextInput w="100%" miw={300} placeholder="논문 제목" />
          </Table.Data>
          <Table.Data>
            <Select w={100} placeholder="확인 여부" />
          </Table.Data>
        </Table.FilterRow>
        <Table.Row
          onClick={() => {
            push(`revision/1`);
          }}
        >
          <Table.Data>1</Table.Data>
          <Table.Data>인터랙션사이언스학과</Table.Data>
          <Table.Data>공배선</Table.Data>
          <Table.Data>Design of Real-time SIFT Feature ...</Table.Data>
          <Table.Data>미확인</Table.Data>
        </Table.Row>
      </Table>
      <Center>
        <Pagination total={1} />
      </Center>
    </Stack>
  );
}

export default ProfRevisionListSection;
