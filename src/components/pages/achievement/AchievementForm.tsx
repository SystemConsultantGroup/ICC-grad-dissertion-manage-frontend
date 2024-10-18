import { BasicRow, RowGroup } from "@/components/common/rows";
import { DATE_FORMAT } from "@/constants/date";
import {
  Button,
  ComboboxData,
  Group,
  InputBase,
  Modal,
  NumberInput,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { IMaskInput } from "react-imask";
import { DateInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import {
  ACHIEVEMENT_AUTHOR_TYPE_LOOKUP_TABLE,
  ACHIEVEMENT_TYPE_LOOKUP_TABLE,
  AchievementAuthorType,
  AchievementType,
} from "@/api/_types/achievement";
import { UseFormReturnType } from "@mantine/form";
import { ClientAxios } from "@/api/ClientAxios";
import { API_ROUTES } from "@/api/apiRoute";
import { showNotificationError, showNotificationSuccess } from "@/components/common/Notifications";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProfessors } from "@/api/SWR";
import { PAGE_NUMBER_GET_ALL, PAGE_SIZE_GET_ALL } from "@/constants/pagination";
import { SelectedProfessor } from "../AdminStudentForm/_types/AdminStudentForm";

export interface AchievementFormInput {
  performance: AchievementType;
  journalName: string;
  paperTitle: string;
  ISSN1?: string;
  ISSN2?: string;
  publicationDate: Date;
  authorType: AchievementAuthorType;
  authorNumbers: number;
  professorIds: number[];
}

interface Props {
  form: UseFormReturnType<AchievementFormInput>;
  handleSubmit: (input: AchievementFormInput) => void;
  isEdit?: boolean;
  isAdmin?: boolean;
}

interface SelectedAdvisor {
  value: string;
  label: string;
}

function AchievementForm({ form, handleSubmit, isEdit, isAdmin }: Props) {
  const { onSubmit, getInputProps, values } = form;
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const {
    data: professors,
    isLoading: isLoadingProf,
    error: errorProf,
  } = useProfessors({ pageNumber: PAGE_NUMBER_GET_ALL, pageSize: PAGE_SIZE_GET_ALL }, true);
  const [professorsSelectData, setProfessorsSelectData] = useState<ComboboxData>();
  const [advisors, setAdvisors] = useState<number[]>([]);
  const [selectedAdvisors, setSelectedAdvisors] = useState<SelectedAdvisor[]>([]);
  const [selectedAdvisor, setSelectedAdvisor] = useState<SelectedProfessor>({
    profId: null,
  });
  const [cancleReviewerId, setCancleReviewerId] = useState<string | null>();

  const handleAdvisorSelect = () => {
    const isDuplicate = selectedAdvisors.some(
      (reviewer) => reviewer.value === selectedAdvisor.profId
    );

    if (isDuplicate) {
      showNotificationError({ message: "중복된 배정입니다. 배정 교수 목록을 확인해주세요." });
    } else {
      setSelectedAdvisors((prev) => [
        ...prev,
        {
          value: selectedAdvisor.profId as string,
          label: professors?.find((prof) => prof.id === Number(selectedAdvisor.profId))?.name || "",
        },
      ]);
      const profId = Number(selectedAdvisor.profId);
      setAdvisors((prev) => [...prev, profId]);
      selectedAdvisor.profId = null;
    }
  };

  const handleCancle = () => {
    if (cancleReviewerId) {
      const newSelectedAdvisors = selectedAdvisors.filter(
        (advisor) => advisor.value !== cancleReviewerId
      );
      const newAdvisors = advisors.filter((advisor) => advisor !== Number(cancleReviewerId));
      setSelectedAdvisors(newSelectedAdvisors);
      setAdvisors(newAdvisors);
      setCancleReviewerId(null);
    }
  };

  const transformedAchievementTypeList = Object.entries(ACHIEVEMENT_TYPE_LOOKUP_TABLE).map(
    ([key, value]) => ({ value: key, label: value })
  );
  const transformedAuthorTypeList = Object.entries(ACHIEVEMENT_AUTHOR_TYPE_LOOKUP_TABLE).map(
    ([key, value]) => ({ value: key, label: value })
  );

  const handleDelete = async () => {
    try {
      await ClientAxios.delete(API_ROUTES.achievement.delete(id as string));
      router.push(`/student/achievement/`);
      showNotificationSuccess({ message: "실적 정보가 삭제되었습니다." });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    form.setValues({
      professorIds: advisors,
    });
  }, [advisors]);

  useEffect(() => {
    if (isEdit && values.professorIds) {
      const profIds = values.professorIds;
      const selectedProfessors = profIds.map((pid) => {
        const professor = professors?.find((prof) => prof.id === pid);
        return {
          value: String(pid),
          label: professor?.name || "",
        };
      });
      setSelectedAdvisors(selectedProfessors);
      setAdvisors(profIds);
    }
  }, [professors, values.professorIds]);

  useEffect(() => {
    const setProfessorsData = () => {
      let data: ComboboxData = [];
      if (!isLoadingProf) {
        data = professors
          ? professors
              .map((professor) => ({
                label: professor.department
                  ? `${professor.name} (${professor.department.name})`
                  : `${professor.name}`,
                value: String(professor.id),
              }))
              .sort((a, b) => a.label.localeCompare(b.label))
          : [];
      }
      setProfessorsSelectData(data);
    };
    setProfessorsData();
  }, [isLoadingProf]);

  return (
    <>
      <Modal
        opened={isDeleting}
        onClose={() => setIsDeleting(false)}
        title="논문 실적 삭제 확인"
        centered
      >
        <Stack align="center">
          <Text fw={700}>
            {"<"}
            {form.values.paperTitle}
            {">을 실적에서 삭제하시겠습니까?"}
          </Text>
          <Group>
            <Button variant="outline" onClick={() => setIsDeleting(false)}>
              취소
            </Button>
            <Button color="red" onClick={handleDelete}>
              확인
            </Button>
          </Group>
        </Stack>
      </Modal>
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack gap={0}>
          <RowGroup>
            <BasicRow field="논문 실적 구분">
              <Select
                w={400}
                allowDeselect={false}
                data={transformedAchievementTypeList}
                {...getInputProps("performance")}
              />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="논문/특허 제목">
              <InputBase w={400} {...getInputProps("paperTitle")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="학술지명/학술대회명">
              <InputBase w={400} {...getInputProps("journalName")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="ISSN">
              <Group justify="space-between">
                <InputBase
                  w={100}
                  component={IMaskInput}
                  mask={/^[0-9a-zA-Z]{1,4}$/}
                  {...getInputProps("ISSN1")}
                />
                {" - "}
                <InputBase
                  w={100}
                  component={IMaskInput}
                  mask={/^[0-9a-zA-Z]{1,4}$/}
                  {...getInputProps("ISSN2")}
                />
              </Group>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="게재년월">
              <DateInput
                leftSectionPointerEvents="none"
                leftSection={<IconCalendar size={20} />}
                valueFormat={DATE_FORMAT}
                locale="ko"
                {...getInputProps("publicationDate")}
              />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="주저자 여부">
              <Select w={300} data={transformedAuthorTypeList} {...getInputProps("authorType")} />
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="저자 수">
              <Group wrap="nowrap">
                <NumberInput allowNegative={false} {...getInputProps("authorNumbers")} /> 명
              </Group>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="지도교수 목록">
              <Select
                placeholder="배정된 교수 조회"
                onChange={setCancleReviewerId}
                value={cancleReviewerId}
                styles={{
                  wrapper: {
                    width: 300,
                  },
                }}
                data={selectedAdvisors}
              />
              <Button color="red" style={{ marginLeft: "20px" }} onClick={handleCancle}>
                등록 취소
              </Button>
            </BasicRow>
          </RowGroup>
          <RowGroup>
            <BasicRow field="지도교수 추가">
              <Select
                placeholder="교수를 선택해주세요"
                styles={{
                  wrapper: {
                    width: 300,
                  },
                }}
                data={professorsSelectData}
                value={selectedAdvisor.profId}
                onChange={(value) => {
                  setSelectedAdvisor((prev) => ({
                    ...prev,
                    profId: value,
                  }));
                }}
              />
              <Button style={{ marginLeft: "20px" }} onClick={handleAdvisorSelect}>
                등록
              </Button>
            </BasicRow>
          </RowGroup>
          <RowGroup justify="center" withBorderBottom={false}>
            <Group ml="auto">
              <Button type="submit">{isEdit ? "수정하기" : "실적 등록"}</Button>
              {isEdit && (
                <Button color="red" onClick={() => setIsDeleting(true)}>
                  삭제하기
                </Button>
              )}
            </Group>
            <Button
              component="a"
              href={isAdmin ? "/admin/achievement" : "/student/achievement"}
              variant="subtle"
              ml="auto"
            >
              목록으로
            </Button>
          </RowGroup>
        </Stack>
      </form>
    </>
  );
}

export default AchievementForm;
