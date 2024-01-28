"use client";

import { useEffect, useRef } from "react";
import { UseFormReturnType } from "@mantine/form";
import { Select, SelectProps } from "@mantine/core";
import { PAGE_NUMBER_GET_ALL, PAGE_SIZE_GET_ALL } from "@/constants/pagination";
import { SelectStudentFormValues } from "@/api/_types/students";
import useStudents from "@/api/SWR/useStudents";

interface Props extends Omit<SelectProps, "data" | "form"> {
  departmentId?: number;
  defaultStudentId?: number;
  form?: UseFormReturnType<SelectStudentFormValues>;
}

export function StudentSelect({
  disabled,
  departmentId,
  onChange,
  form,
  defaultStudentId,
  ...props
}: Props) {
  const shouldFetch = departmentId !== undefined;

  const {
    data: students,
    isLoading,
    error,
  } = useStudents(
    {
      departmentId,
      pageNumber: PAGE_NUMBER_GET_ALL,
      pageSize: PAGE_SIZE_GET_ALL,
    },
    shouldFetch
  );

  const initialSetStudentRef = useRef(false);

  useEffect(() => {
    const shouldAbort =
      initialSetStudentRef.current || !students || students.length === 0 || !defaultStudentId;
    if (shouldAbort) return;

    if (defaultStudentId && onChange && form) {
      form.setFieldValue("studentId", defaultStudentId);
      form.resetDirty({ studentId: defaultStudentId, departmentId: departmentId ?? 1 });
      initialSetStudentRef.current = true;
    }
  }, [students, defaultStudentId, onChange, form, departmentId]);

  return (
    <Select
      onChange={onChange}
      disabled={isLoading || error || disabled}
      placeholder={error ? "학생 정보 불러오기 실패" : "학생을 선택해주세요"}
      data={students?.map((student) => ({
        label: student.name,
        value: String(student.id),
      }))}
      {...props}
    />
  );
}
