"use client";

//import { useState } from "react";
import { Stack, Select, Button } from "@mantine/core";
import { RowGroup, BasicRow, TitleRow } from "@/components/common/rows";
import { UseFormReturnType } from "@mantine/form";
import { SelectProfessorFormValues } from "@/api/_types/professors";
import AdminStudentFormInputs from "./_types/AdminStudentFormInputs";

function AssignProfSection({ form }: { form: UseFormReturnType<AdminStudentFormInputs> }) {
  //const [assignedProfs, SetAssignedProfs] = useState([]);

  return (
    <Stack gap={0}>
      <TitleRow title="교수 배정 정보" />
      <RowGroup>
        <BasicRow field="배정 교수 목록">
          {/* TODO: 심사위원장 여부 표시 */}
          <Select
            placeholder="배정된 교수 조회"
            styles={{
              wrapper: {
                width: 300,
              },
            }}
          />
          <Button color="red" style={{ marginLeft: "20px" }}>
            배정 취소
          </Button>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="교수 배정">
          {/* TODO: DepartmentsSelect 컴포넌트로 대체 (default: 해당 학생의 deptID) */}
          <Select placeholder="소속 선택" />
          {/* TODO: ProfessorsSelect 컴포넌트로 대체 */}
          <Select placeholder="교수 선택" style={{ marginLeft: "10px" }} />
          <Button style={{ marginLeft: "20px" }}>배정하기</Button>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="심사위원장 배정">
          {/* TODO: DepartmentsSelect 컴포넌트로 대체 (default: 해당 학생의 deptID) */}
          <Select placeholder="소속 선택" />
          {/* TODO: ProfessorsSelect 컴포넌트로 대체 */}
          <Select placeholder="교수 선택" style={{ marginLeft: "10px" }} />
          <Button style={{ marginLeft: "20px" }}>배정하기</Button>
        </BasicRow>
      </RowGroup>
    </Stack>
  );
}

export default AssignProfSection;
