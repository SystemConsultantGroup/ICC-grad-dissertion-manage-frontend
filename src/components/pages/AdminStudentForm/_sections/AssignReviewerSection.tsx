"use client";

import { useState, useEffect } from "react";
import { Stack, Select, Button } from "@mantine/core";
import { RowGroup, BasicRow, TitleRow } from "@/components/common/rows";
import { ClientAxios } from "@/api/ClientAxios";
import { API_ROUTES } from "@/api/apiRoute";
import { Professor, ReviewerRole } from "@/api/_types/professors";
import { SelectedProfessor } from "../_types/AdminStudentFormInputs";

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
  onChangeReviewerCancle: (role: ReviewerRole, cancleReviewerId: string) => void;
  onChangeReviewerAdd: (role: ReviewerRole, deptId: string, profId: string) => void;
  onChangeReviewersSet?: (role: ReviewerRole, reviewers: Professor[]) => void;
  headReviewer: SelectedProfessor | null;
  advisors: SelectedProfessor[];
  committees: SelectedProfessor[];
  studentId?: string | number;
}

function AssignReviewerSection({
  onChangeReviewerCancle,
  onChangeReviewerAdd,
  onChangeReviewersSet,
  headReviewer,
  advisors,
  committees,
  studentId,
}: Props) {
  /** Select 컴포넌트에서 선택된 심사위원  */
  const [cancleReviewerId, setCancleReviewerId] = useState<string | null>();
  const [selectedAdvisor, setSelectedAdvisor] = useState<SelectedProfessor>({
    profId: null,
    deptId: null,
  });
  const [selectedCommittee, setSelectedCommittee] = useState<SelectedProfessor>({
    profId: null,
    deptId: null,
  });
  const [selectedHeadReviewer, setSelectedHeadReviewer] = useState<SelectedProfessor>({
    profId: null,
    deptId: null,
  });

  /** 배정 취소 Select 에러 상태 */
  const [cancleError, setCancleError] = useState<boolean>(false);

  /** 심사위원 정보 조회 */
  /* useEffect(() => {
    const fetchReviewer = async () => {
      if (studentId && onChangeReviewersSet) {
        const response = await ClientAxios.get(API_ROUTES.student.getReviewer(Number(studentId)));
        const reviewerDetails = response.data;
        onChangeReviewerAdd(
          "HEAD",
          String(reviewerDetails.headReviewer.department.id),
          String(reviewerDetails.headReviewer.id)
        );
        onChangeReviewersSet("ADVISOR", reviewerDetails.advisors);
        onChangeReviewersSet("COMMITTEE", reviewerDetails.committees);
      }
    };

    fetchReviewer();
  }); */

  /** 배정된 교수 목록 조회시 label 설정하는 함수 */
  const assignedReviewerLabel = (role: ReviewerRole, professorId?: number, deptId?: number) => {
    const professorName = professorId
      ? profList.find((professor) => professor.professorId === professorId)?.name
      : "";
    const deptName = deptId ? deptList.find((dept) => dept.deptId === deptId)?.name : "";
    const name = `${professorName} (${deptName})`;
    console.log(`교수 아이디: ${professorId} (${deptId})`);

    switch (role) {
      case "HEAD":
        return `[심사위원장] ${name}`;
      case "ADVISOR":
        return `[지도교수] ${name}`;
      case "COMMITTEE":
        return `[심사위원] ${name}`;
      default:
        return "";
    }
  };

  /** 배정 취소 */
  const handleCancle = () => {
    if (cancleReviewerId) {
      if (headReviewer?.profId === cancleReviewerId) {
        onChangeReviewerCancle("HEAD", cancleReviewerId);
      } else if (advisors.some((advisor) => advisor.profId === cancleReviewerId)) {
        onChangeReviewerCancle("ADVISOR", cancleReviewerId);
      } else if (committees.some((committee) => committee.profId === cancleReviewerId)) {
        onChangeReviewerCancle("COMMITTEE", cancleReviewerId);
      } else {
        setCancleError(true);
      }
    }
  };

  /** 지도교수 선택 */
  const handleAdvisorSelect = () => {
    if (selectedAdvisor.deptId && selectedAdvisor.profId) {
      onChangeReviewerAdd("ADVISOR", selectedAdvisor.deptId, selectedAdvisor.profId);
    }
  };

  /** 심사위원 선택 */
  const handleCommitteeSelect = () => {
    if (selectedCommittee.deptId && selectedCommittee.profId) {
      onChangeReviewerAdd("COMMITTEE", selectedCommittee.deptId, selectedCommittee.profId);
    }
  };

  /** 심사위원장 선택 */
  const handleHeadReviewerSelect = () => {
    if (selectedHeadReviewer.deptId && selectedHeadReviewer.profId) {
      onChangeReviewerAdd("HEAD", selectedHeadReviewer.deptId, selectedHeadReviewer.profId);
    }
  };

  return (
    <Stack gap={0}>
      <TitleRow title="교수 배정 정보" />
      <RowGroup>
        <BasicRow field="배정 교수 목록">
          <Select
            placeholder="배정된 교수 조회"
            onChange={setCancleReviewerId}
            styles={{
              wrapper: {
                width: 300,
              },
            }}
            error={cancleError}
            data={[
              ...(headReviewer
                ? [
                    {
                      value: headReviewer.profId ?? "",
                      label: assignedReviewerLabel(
                        "HEAD",
                        Number(headReviewer.profId),
                        Number(headReviewer.deptId)
                      ),
                    },
                  ]
                : []),
              ...advisors.map((advisor) => ({
                value: advisor.profId ?? "",
                label: assignedReviewerLabel(
                  "ADVISOR",
                  Number(advisor.profId),
                  Number(advisor.deptId)
                ),
              })),
              ...committees.map((committee) => ({
                value: committee.profId ?? "",
                label: assignedReviewerLabel(
                  "COMMITTEE",
                  Number(committee.profId),
                  Number(committee.deptId)
                ),
              })),
            ]}
          />
          <Button color="red" style={{ marginLeft: "20px" }} onClick={handleCancle}>
            배정 취소
          </Button>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="지도교수 배정">
          {/* TODO: DepartmentsSelect 컴포넌트로 대체 */}
          <Select
            placeholder="소속 선택"
            onChange={(value) => {
              setSelectedAdvisor((prev) => ({
                ...prev,
                deptId: value,
              }));
            }}
            data={deptList.map((dept) => ({ value: String(dept.deptId), label: dept.name }))}
          />
          {/* TODO: ProfessorsSelect 컴포넌트로 대체 */}
          <Select
            placeholder="교수 선택"
            onChange={(value) => {
              setSelectedAdvisor((prev) => ({
                ...prev,
                profId: value,
              }));
            }}
            style={{ marginLeft: "10px" }}
            data={profList.map((professor) => ({
              value: String(professor.professorId),
              label: professor.name,
            }))}
          />
          <Button style={{ marginLeft: "20px" }} onClick={handleAdvisorSelect}>
            배정하기
          </Button>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="심사위원 배정">
          {/* TODO: DepartmentsSelect 컴포넌트로 대체 */}
          <Select
            placeholder="소속 선택"
            onChange={(value) => {
              setSelectedCommittee((prev) => ({
                ...prev,
                deptId: value,
              }));
            }}
            data={deptList.map((dept) => ({ value: String(dept.deptId), label: dept.name }))}
          />
          {/* TODO: ProfessorsSelect 컴포넌트로 대체 */}
          <Select
            placeholder="교수 선택"
            onChange={(value) => {
              setSelectedCommittee((prev) => ({
                ...prev,
                profId: value,
              }));
            }}
            style={{ marginLeft: "10px" }}
            data={profList.map((professor) => ({
              value: String(professor.professorId),
              label: professor.name,
            }))}
          />
          <Button style={{ marginLeft: "20px" }} onClick={handleCommitteeSelect}>
            배정하기
          </Button>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="심사위원장 배정">
          {/* TODO: DepartmentsSelect 컴포넌트로 대체 */}
          <Select
            placeholder="소속 선택"
            onChange={(value) => {
              setSelectedHeadReviewer((prev) => ({
                ...prev,
                deptId: value,
              }));
            }}
            data={deptList.map((dept) => ({ value: String(dept.deptId), label: dept.name }))}
          />
          {/* TODO: ProfessorsSelect 컴포넌트로 대체 */}
          <Select
            placeholder="교수 선택"
            onChange={(value) => {
              setSelectedHeadReviewer((prev) => ({
                ...prev,
                profId: value,
              }));
            }}
            style={{ marginLeft: "10px" }}
            data={profList.map((professor) => ({
              value: String(professor.professorId),
              label: professor.name,
            }))}
          />
          <Button style={{ marginLeft: "20px" }} onClick={handleHeadReviewerSelect}>
            배정하기
          </Button>
        </BasicRow>
      </RowGroup>
    </Stack>
  );
}

export default AssignReviewerSection;
