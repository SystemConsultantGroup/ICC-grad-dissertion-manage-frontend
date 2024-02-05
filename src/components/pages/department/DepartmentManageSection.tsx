"use client";

import useDepartments from "@/api/SWR/useDepartments";
import { DepartmentTable, DepartmentTableRow } from "@/components/pages/department/DepartmentTable";
import { Section } from "@/components/common/Section";
import { Stack } from "@mantine/core";
import { RowGroup, TitleRow } from "@/components/common/rows";
import DepartmentCreateRow from "./DepartmentCreateRow";

function DepartmentManageSection() {
  const { data, isLoading, mutate } = useDepartments();

  return (
    <Section>
      <Stack>
        <Stack>
          <TitleRow title="학과 목록" />
          <DepartmentTable>
            {!isLoading &&
              data?.departments.map((department, index) => (
                <DepartmentTableRow
                  id={department.id}
                  key={index}
                  name={department.name}
                  userCount={department.userCount}
                  mutate={mutate}
                />
              ))}
          </DepartmentTable>
        </Stack>
        <Stack gap={0}>
          <TitleRow title="학과 추가" />
          <RowGroup>
            <DepartmentCreateRow mutate={mutate} />
          </RowGroup>
        </Stack>
      </Stack>
    </Section>
  );
}

export default DepartmentManageSection;
