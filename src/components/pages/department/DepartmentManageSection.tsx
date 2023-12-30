"use client";

import useDepartments from "@/api/SWR/useDepartments";
import { DepartmentTable, DepartmentTableRow } from "@/components/pages/department/DepartmentTable";
import HeaderRow from "@/components/common/Rows/HeaderRow/HeaderRow";
import Section from "@/components/common/Section";
import Split from "@/components/common/Split";
import { Stack } from "@mantine/core";

function DepartmentManageSection() {
  const { data, isLoading, mutate } = useDepartments();

  return (
    <Section>
      <Stack>
        <HeaderRow>
          <Split>
            <HeaderRow.Title>학과 목록</HeaderRow.Title>
          </Split>
        </HeaderRow>
        <DepartmentTable>
          {!isLoading &&
            data?.departments.map((department, index) => {
              const { id, name, userCount } = department;
              return <DepartmentTableRow id={id} key={index} name={name} userCount={userCount} />;
            })}
        </DepartmentTable>
      </Stack>
    </Section>
  );
}

export default DepartmentManageSection;
