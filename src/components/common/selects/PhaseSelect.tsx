"use client";

import { Select, SelectProps } from "@mantine/core";
import usePhases from "@/api/SWR/usePhases";

interface Props extends Omit<SelectProps, "data"> {}

export function PhaseSelect({ disabled, ...props }: Props) {
  const { data, isLoading, error } = usePhases();

  return (
    <Select
      disabled={isLoading || disabled}
      {...props}
      placeholder={error ? "단계 불러오기 실패" : "단계를 선택해주세요"}
      data={data?.phases.map((Phase) => ({
        value: String(Phase.id),
        label: Phase.title,
      }))}
    />
  );
}
