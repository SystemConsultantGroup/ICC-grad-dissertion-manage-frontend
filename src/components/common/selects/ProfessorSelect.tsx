"use client";

import { useEffect, useRef } from "react";
import { UseFormReturnType } from "@mantine/form";
import { Select, SelectProps } from "@mantine/core";
import { PAGE_NUMBER_GET_ALL, PAGE_SIZE_GET_ALL } from "@/constants/pagination";
import useProfessors from "@/api/SWR/useProfessor";
import { SelectProfessorFormValues } from "@/api/_types/professors";

interface Props extends Omit<SelectProps, "data" | "form"> {
  departmentId?: number;
  defaultProfessorId?: number;
  form?: UseFormReturnType<SelectProfessorFormValues>;
}

export function ProfessorSelect({
  disabled,
  departmentId,
  onChange,
  form,
  defaultProfessorId,
  ...props
}: Props) {
  const shouldFetch = departmentId !== undefined;

  const {
    data: professors,
    isLoading,
    error,
  } = useProfessors(
    {
      deptId: departmentId,
      pageNumber: PAGE_NUMBER_GET_ALL,
      pageSize: PAGE_SIZE_GET_ALL,
    },
    shouldFetch
  );

  const initialSetProfessorRef = useRef(false);

  useEffect(() => {
    const shouldAbort =
      initialSetProfessorRef.current ||
      !professors ||
      professors.length === 0 ||
      !defaultProfessorId;
    if (shouldAbort) return;

    if (defaultProfessorId && onChange && form) {
      form.setFieldValue("professorId", defaultProfessorId);
      form.resetDirty({ professorId: defaultProfessorId, departmentId: departmentId ?? 1 });
      initialSetProfessorRef.current = true;
    }
  }, [professors, defaultProfessorId, onChange, form, departmentId]);

  return (
    <Select
      {...props}
      onChange={onChange}
      disabled={isLoading || error || disabled}
      placeholder={error ? "교수 정보 불러오기 실패" : "교수를 선택해주세요"}
      data={professors?.map((professor) => ({
        label: professor.name,
        value: String(professor.id),
      }))}
    />
  );
}
