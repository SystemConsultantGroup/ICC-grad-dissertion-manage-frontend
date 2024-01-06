"use client";

import { Select, SelectProps } from "@mantine/core";
import useDepartments from "@/api/SWR/useDepartments";

interface Props extends Omit<SelectProps, "data"> {}

export function DepartmentSelect({ disabled, ...props }: Props) {
  const { data, isLoading, error } = useDepartments();

  return (
    <Select
      disabled={isLoading || disabled}
      placeholder={error ? "소속 불러오기 실패" : "소속을 선택해주세요"}
      data={data?.departments.map((department) => ({
        value: String(department.id),
        label: department.name,
      }))}
      {...props}
    />
  );
}
