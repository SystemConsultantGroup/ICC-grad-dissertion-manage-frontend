import { IconEditCircle } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import Modal from "@/components/common/Modal";
import { ClientAxios } from "@/api/ClientAxios";
import { API_ROUTES } from "@/api/apiRoute";
import { Stack, Button } from "@mantine/core";
import { RowGroup, ButtonRow } from "@/components/common/rows";
import ThesisTitleSection from "./ThesisTitleSection";
import AssignReviewerSection from "./AssignReviewerSection";
import useReviewersAssign from "../_hooks/useReviewersAssign";
import { AdminStudentFormInputs } from "../_types/AdminStudentForm";

interface Props {
  studentId: string | number;
  opened: boolean;
  close: () => void;
}
function MainRegisterModal({ studentId, opened, close }: Props) {
  const sysMainForm = useForm<AdminStudentFormInputs>({});
  /** 본심 심사위원장 / 심사위원 설정*/
  const { headReviewer, advisors, committees, handleReviewerCancel, handleReviewerAdd } =
    useReviewersAssign();

  /** 본심 정보 등록하기 */
  const handleSubmit = async () => {
    try {
      if (studentId) {
        const { basicInfo, ...sysMainValues } = sysMainForm.values;
        await ClientAxios.post(API_ROUTES.student.putSystem(Number(studentId)), sysMainValues);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            <ButtonRow buttons={[<Button key="mainRegister">등록하기</Button>]} />
          </RowGroup>
        </Stack>
      </form>
    </Modal>
  );
}

export default MainRegisterModal;
