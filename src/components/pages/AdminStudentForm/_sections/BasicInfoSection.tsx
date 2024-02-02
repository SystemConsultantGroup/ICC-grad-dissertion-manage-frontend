"use client";

import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconEditCircle } from "@tabler/icons-react";
import { Stack, TextInput, PasswordInput, Select, Text, Button } from "@mantine/core";
import { RowGroup, BasicRow, TitleRow, NoticeRow, ButtonRow } from "@/components/common/rows";
import { useForm, UseFormReturnType } from "@mantine/form";
import { ClientAxios } from "@/api/ClientAxios";
import { API_ROUTES } from "@/api/apiRoute";
import { Phase } from "@/api/_types/phase";
import Modal from "@/components/common/Modal";
import ThesisTitleSection from "./ThesisTitleSection";
import { AdminStudentFormInputs } from "../_types/AdminStudentForm";
import AssignReviewerSection from "./AssignReviewerSection";
import useReviewersAssign from "../_hooks/useReviewersAssign";

interface Props {
  form: UseFormReturnType<AdminStudentFormInputs>;
  studentId?: string | number;
}

function BasicInfoSection({ form, studentId }: Props) {
  const [opened, { open, close }] = useDisclosure();
  const [phase, setPhase] = useState<Phase>();

  const sysMainForm = useForm<AdminStudentFormInputs>({});
  /** 본심 심사위원장 / 심사위원 설정*/
  const { headReviewer, advisors, committees, handleReviewerCancel, handleReviewerAdd } =
    useReviewersAssign();

  useEffect(() => {
    // 학생 기본 정보 가져오기
    const fetchStudentDetails = async () => {
      try {
        if (studentId) {
          // 기본 정보 조회
          const response = await ClientAxios.get(API_ROUTES.student.get(studentId));
          const studentDetails = response.data;

          // 시스템 정보 조회
          const sysResponse = await ClientAxios.get(API_ROUTES.student.getSystem(studentId));
          const sysDetails = sysResponse.data;
          setPhase(sysDetails.phase);

          form.setFieldValue("basicInfo", {
            loginId: studentDetails.loginId,
            password: studentDetails.password,
            name: studentDetails.name,
            email: studentDetails.email,
            phone: studentDetails.phone,
            deptId: String(studentDetails.department.id),
            phaseId: String(sysDetails.phase.id),
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudentDetails();
  }, [studentId, form.setFieldValue]);

  // 본심 정보 등록하기
  const handleSubmit = async () => {
    try {
      if (studentId) {
        const { basicInfo, ...sysMainValues } = sysMainForm.values;
        await ClientAxios.post(API_ROUTES.student.putSystem(studentId), sysMainValues);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack gap={0}>
      {studentId ? (
        <NoticeRow text="정보를 수정한 후, 하단의 수정하기 버튼을 눌러야 모든 수정사항이 반영됩니다." />
      ) : (
        <NoticeRow text="기존에 이미 등록된 학생의 경우, 학생 현황 및 관리 페이지를 이용해주세요." />
      )}
      <TitleRow title="학생 기본 정보" />
      <Stack gap={0}>
        <RowGroup>
          <BasicRow field="아이디">
            <TextInput id="input-id" {...form.getInputProps("basicInfo.loginId")} />
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="비밀번호">
            <PasswordInput id="input-password" {...form.getInputProps("basicInfo.password")} />
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="이름">
            <TextInput id="input-name" {...form.getInputProps("basicInfo.name")} />
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="이메일">
            <TextInput id="input-email" {...form.getInputProps("basicInfo.email")} />
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="연락처">
            <TextInput id="input-phone" {...form.getInputProps("basicInfo.phone")} />
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="학과">
            {/* TODO: DepartmentsSelect 컴포넌트로 대체 */}
            <Select
              placeholder="학과 선택"
              styles={{
                wrapper: {
                  width: 300,
                },
              }}
              {...form.getInputProps("basicInfo.deptId")}
            />
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="시스템 단계">
            {studentId ? (
              <>
                <Text style={{ width: 310 }}>{phase?.title}</Text>
                {phase?.id === 3 && (
                  <ButtonRow
                    buttons={[
                      <Button key="switch" onClick={open}>
                        본심 전환
                      </Button>,
                    ]}
                  />
                )}
                <Modal
                  opened={opened}
                  onClose={close}
                  title="본심 정보 등록"
                  icon={<IconEditCircle />}
                  withCloseButton
                  size="xl"
                >
                  <form onSubmit={sysMainForm.onSubmit(handleSubmit)}>
                    <Stack gap={10}>
                      <AssignReviewerSection
                        headReviewer={headReviewer}
                        advisors={advisors}
                        committees={committees}
                        onChangeReviewerAdd={handleReviewerAdd}
                        onChangeReviewerCancle={handleReviewerCancel}
                      />
                      <ThesisTitleSection form={sysMainForm} />
                      <RowGroup>
                        <ButtonRow buttons={[<Button key="mainRegister">등록하기</Button>]} />
                      </RowGroup>
                    </Stack>
                  </form>
                </Modal>
              </>
            ) : (
              <Select
                placeholder="예심/본심 여부 선택"
                data={[
                  { value: "1", label: "예심" },
                  { value: "4", label: "본심" },
                ]}
                styles={{
                  wrapper: {
                    width: 300,
                  },
                }}
                {...form.getInputProps("basicInfo.phaseId")}
              />
            )}
          </BasicRow>
        </RowGroup>
      </Stack>
    </Stack>
  );
}

export default BasicInfoSection;
