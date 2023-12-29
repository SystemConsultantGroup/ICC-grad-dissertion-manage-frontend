"use client";

import { Select, SelectProps } from "@mantine/core";
import useDepartments from "@/api/SWR/useDepartments";

interface Props extends Omit<SelectProps, "data"> {}

export function DepartmentSelect({ disabled, ...props }: Props) {
  const { data, isLoading } = useDepartments();

  return (
    <Select
      disabled={isLoading || disabled}
      {...props}
      placeholder="소속 선택"
      data={data?.departments.map((department) => ({
        value: String(department.id),
        label: department.name,
      }))}
    />
  );
}
