import { IconEditCircle } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import Modal from "@/components/common/Modal";
import { ClientAxios } from "@/api/ClientAxios";
import { API_ROUTES } from "@/api/apiRoute";
import { Stack, Button } from "@mantine/core";
import { RowGroup, ButtonRow } from "@/components/common/rows";
import { useEffect } from "react";
import ThesisTitleSection from "./ThesisTitleSection";
import AssignReviewerSection from "./AssignReviewerSection";
import useReviewersAssign from "../_hooks/useReviewersAssign";
import { AdminStudentFormInputs, SelectedProfessor } from "../_types/AdminStudentForm";

interface Props {
  studentId: string | number | undefined;
  opened: boolean;
  close: () => void;
}
function MainRegisterModal({ studentId, opened, close }: Props) {
  const sysMainForm = useForm<AdminStudentFormInputs>({});
  /** 본심 심사위원장 / 심사위원 설정*/
  const {
    headReviewer,
    advisors,
    committees,
    handleReviewerCancel,
    handleReviewerAdd,
    handleReviewersSet,
  } = useReviewersAssign();

  /** 본심 정보 등록하기 */
  const handleSubmit = async () => {
    try {
      if (studentId) {
        const { basicInfo, ...sysMainValues } = sysMainForm.values;
        const body = {
          thesisTitle: sysMainValues.thesisTitle,
          headReviewerId: Number(headReviewer?.profId),
          advisorIds: advisors.map((advisor: SelectedProfessor) => Number(advisor.profId)),
          committeeIds: committees.map((committee: SelectedProfessor) => Number(committee.profId)),
        };
        await ClientAxios.put(API_ROUTES.student.putSystem(Number(studentId)), body);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (studentId) {
      const fetchReviewer = async () => {
        const response = await ClientAxios.get(API_ROUTES.student.getReviewer(Number(studentId)));
        const reviewerDetails = response.data;
        handleReviewersSet(
          reviewerDetails.headReviewer,
          reviewerDetails.advisors,
          reviewerDetails.committees
        );
      };
      fetchReviewer();
    }
  }, []);

  return (
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
            <ButtonRow
              buttons={[
                <Button key="mainRegister" type="submit">
                  등록하기
                </Button>,
              ]}
            />
          </RowGroup>
        </Stack>
      </form>
    </Modal>
  );
}

export default MainRegisterModal;
