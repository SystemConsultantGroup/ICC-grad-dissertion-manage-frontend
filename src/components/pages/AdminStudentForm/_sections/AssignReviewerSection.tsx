"use client";

import { useState, useEffect, useMemo } from "react";
import { Stack, Select, Button } from "@mantine/core";
import { RowGroup, BasicRow, TitleRow } from "@/components/common/rows";
import { ClientAxios } from "@/api/ClientAxios";
import { API_ROUTES } from "@/api/apiRoute";
import { PAGE_NUMBER_GET_ALL, PAGE_SIZE_GET_ALL } from "@/constants/pagination";
import { Professor, ReviewerRole } from "@/api/_types/professors";
import { ProfessorSelect } from "@/components/common/selects/ProfessorSelect";
import { DepartmentSelect } from "@/components/common/selects/DepartmentSelect";
import { useProfessors, useDepartments } from "@/api/SWR";
import { SelectedProfessor } from "../_types/AdminStudentForm";

interface Props {
  studentId?: string | number;

  headReviewer: SelectedProfessor | null;
  advisors: SelectedProfessor[];
  committees: SelectedProfessor[];

  onChangeReviewerCancle: (role: ReviewerRole, cancleReviewerId: string) => void;
  onChangeReviewerAdd: (role: ReviewerRole, deptId: string, profId: string) => void;
  onChangeReviewersSet?: (
    _headReviewer: Professor,
    _advisors: Professor[],
    _committees: Professor[]
  ) => void;
}

interface SelectedReviewer {
  value: string;
  label: string;
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
  /** 교수 목록, 학과 목록 조회 */
  const {
    data: professors,
    isLoading: isLoadingProf,
    error: errorProf,
  } = useProfessors({ pageNumber: PAGE_NUMBER_GET_ALL, pageSize: PAGE_SIZE_GET_ALL });
  const { data: deptData, isLoading: isLoadingDept, error: errorDept } = useDepartments();

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
  const [selectedReviewers, setSelectedReviwers] = useState<SelectedReviewer[]>([]);

  /** 배정 취소 Select 에러 상태 */
  const [cancleError, setCancleError] = useState<boolean>(false);

  /** 심사위원 정보 조회 */
  useEffect(() => {
    const fetchReviewer = async () => {
      if (studentId && onChangeReviewersSet) {
        const response = await ClientAxios.get(API_ROUTES.student.getReviewer(Number(studentId)));
        const reviewerDetails = response.data;
        onChangeReviewersSet(
          reviewerDetails.headReviewer,
          reviewerDetails.advisors,
          reviewerDetails.committees
        );
      }
    };

    fetchReviewer();
  });

  /** 배정된 교수 목록 조회시 label 설정하는 함수 */
  const assignedReviewerLabel = useMemo(
    () => (role: ReviewerRole, professorId: number, deptId: number) => {
      const professorName =
        professors?.find((professor) => professor.id === professorId)?.name || "";
      const deptName = deptData?.departments?.find((dept) => dept.id === deptId)?.name || "";
      const name = `${professorName} (${deptName})`;

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
    },
    [professors, deptData]
  );

  /** 배정된 교수 목록 업데이트 */
  useEffect(() => {
    setSelectedReviwers([
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
        label: assignedReviewerLabel("ADVISOR", Number(advisor.profId), Number(advisor.deptId)),
      })),
      ...committees.map((committee) => ({
        value: committee.profId ?? "",
        label: assignedReviewerLabel(
          "COMMITTEE",
          Number(committee.profId),
          Number(committee.deptId)
        ),
      })),
    ]);
  }, [headReviewer, advisors, committees, assignedReviewerLabel]);

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
            data={selectedReviewers}
          />
          <Button color="red" style={{ marginLeft: "20px" }} onClick={handleCancle}>
            배정 취소
          </Button>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="지도교수 배정">
          <DepartmentSelect
            onChange={(value) => {
              setSelectedAdvisor((prev) => ({
                ...prev,
                deptId: value,
              }));
            }}
          />
          <ProfessorSelect
            departmentId={Number(selectedAdvisor.deptId)}
            onChange={(value) => {
              setSelectedAdvisor((prev) => ({
                ...prev,
                profId: value,
              }));
            }}
            style={{ marginLeft: "10px" }}
          />
          <Button style={{ marginLeft: "20px" }} onClick={handleAdvisorSelect}>
            배정하기
          </Button>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="심사위원 배정">
          <DepartmentSelect
            onChange={(value) => {
              setSelectedCommittee((prev) => ({
                ...prev,
                deptId: value,
              }));
            }}
          />
          <ProfessorSelect
            departmentId={Number(selectedCommittee.deptId)}
            onChange={(value) => {
              setSelectedCommittee((prev) => ({
                ...prev,
                profId: value,
              }));
            }}
            style={{ marginLeft: "10px" }}
          />
          <Button style={{ marginLeft: "20px" }} onClick={handleCommitteeSelect}>
            배정하기
          </Button>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="심사위원장 배정">
          <DepartmentSelect
            onChange={(value) => {
              setSelectedHeadReviewer((prev) => ({
                ...prev,
                deptId: value,
              }));
            }}
          />
          <ProfessorSelect
            departmentId={Number(selectedHeadReviewer.deptId)}
            onChange={(value) => {
              setSelectedHeadReviewer((prev) => ({
                ...prev,
                profId: value,
              }));
            }}
            style={{ marginLeft: "10px" }}
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
