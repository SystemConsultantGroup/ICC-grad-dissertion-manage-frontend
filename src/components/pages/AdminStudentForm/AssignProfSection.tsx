"use client";

import { useState, useEffect } from "react";
import { Stack, Select, Button } from "@mantine/core";
import { RowGroup, BasicRow, TitleRow } from "@/components/common/rows";
import { UseFormReturnType } from "@mantine/form";
import AdminStudentFormInputs from "./_types/AdminStudentFormInputs";

const deptList = [
  { deptId: 0, name: "전자전기공학과" },
  { deptId: 1, name: "전자전기공학과" },
];

const profList = [
  { professorId: 0, name: "김교수" },
  { professorId: 1, name: "이교수" },
  { professorId: 2, name: "박교수" },
  { professorId: 3, name: "최교수" },
  { professorId: 4, name: "한교수" },
];

interface Props {
  form: UseFormReturnType<AdminStudentFormInputs>;
  studentId?: string | number;
}

interface SelectAssignedProfessor {
  value: string;
  label: string;
}

function AssignProfSection({ form, studentId }: Props) {
  const [cancleProf, setCancleProf] = useState<string | null>(null);
  const [deptChairman, setDeptChairman] = useState<string | null>(null); // 교수(심사위원장)의 department id
  const [chairman, setChairman] = useState<string | null>(null); // 교수(심사위원장) id
  const [deptProf, setDeptProf] = useState<string | null>(null); // 교수(심사위원)의 department id
  const [prof, setProf] = useState<string | null>(null); // 교수(심사위원) id

  const [assginedProfList, setAssignedProfList] = useState<SelectAssignedProfessor[]>([]);

  useEffect(() => {
    if (form.values.chairman) {
      setAssignedProfList((list) => [
        ...list,
        {
          value: String(form.values.chairman?.professorId),
          label: assignedProfName(
            form.values.chairman?.professorId,
            form.values.chairman?.departmentId,
            true
          ),
        },
      ]);
    }

    if (form.values.professors) {
      setAssignedProfList((assignedProfList) => [
        ...assignedProfList,
        ...form.values.professors.map((professor) => ({
          value: String(professor.professorId),
          label: assignedProfName(professor.professorId, professor.departmentId, false),
        })),
      ]);
    }
  }, [form.values.chairman, form.values.professors]);
  const handleCancle = () => {
    if (cancleProf == null) return;
    if (form.values.chairman && form.values.chairman.professorId === Number(cancleProf)) {
      form.setFieldValue("chairman", null);
    } else {
      const professors = [...form.values.professors];
      professors.filter((professor) => cancleProf !== String(professor.professorId));
      form.setFieldValue("professors", professors);
    }
  };

  const handleProfessorSelect = () => {
    if (deptProf == null || prof == null) return;
    form.setFieldValue("professors", [
      ...form.values.professors,
      {
        departmentId: Number(deptProf),
        professorId: Number(prof),
      },
    ]);
  };

  const handleChairmanSelect = () => {
    if (deptChairman == null || chairman == null) return;
    form.setFieldValue("chairman", {
      departmentId: Number(deptChairman),
      professorId: Number(chairman),
    });
  };

  const assignedProfName = (professorId?: number, deptId?: number, isChairman?: boolean) => {
    const professorName = professorId
      ? profList.find((professor) => professor.professorId === professorId)?.name
      : null;
    const deptName = deptId ? deptList.find((dept) => dept.deptId === deptId)?.name : null;
    const name = `${professorName} (${deptName})`;
    if (isChairman) name.concat(" (심사위원장)");
    return name;
  };

  return (
    <Stack gap={0}>
      <TitleRow title="교수 배정 정보" />
      <RowGroup>
        <BasicRow field="배정 교수 목록">
          <Select
            placeholder="배정된 교수 조회"
            onChange={setCancleProf}
            styles={{
              wrapper: {
                width: 300,
              },
            }}
            data={assginedProfList}
          />
          <Button color="red" style={{ marginLeft: "20px" }} onClick={handleCancle}>
            배정 취소
          </Button>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="교수 배정">
          {/* TODO: DepartmentsSelect 컴포넌트로 대체 */}
          <Select
            placeholder="소속 선택"
            onChange={setDeptProf}
            data={deptList.map((dept) => ({ value: String(dept.deptId), label: dept.name }))}
          />
          {/* TODO: ProfessorsSelect 컴포넌트로 대체 */}
          <Select
            placeholder="교수 선택"
            onChange={setProf}
            style={{ marginLeft: "10px" }}
            data={profList.map((professor) => ({
              value: String(professor.professorId),
              label: professor.name,
            }))}
          />
          <Button style={{ marginLeft: "20px" }} onClick={handleProfessorSelect}>
            배정하기
          </Button>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="심사위원장 배정">
          {/* TODO: DepartmentsSelect 컴포넌트로 대체 */}
          <Select
            placeholder="소속 선택"
            onChange={setDeptChairman}
            data={deptList.map((dept) => ({ value: String(dept.deptId), label: dept.name }))}
          />
          {/* TODO: ProfessorsSelect 컴포넌트로 대체 */}
          <Select
            placeholder="교수 선택"
            onChange={setChairman}
            style={{ marginLeft: "10px" }}
            data={profList.map((professor) => ({
              value: String(professor.professorId),
              label: professor.name,
            }))}
          />
          <Button style={{ marginLeft: "20px" }} onClick={handleChairmanSelect}>
            배정하기
          </Button>
        </BasicRow>
      </RowGroup>
    </Stack>
  );
}

export default AssignProfSection;
