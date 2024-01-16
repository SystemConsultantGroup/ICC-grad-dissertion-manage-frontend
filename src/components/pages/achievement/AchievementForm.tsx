import { BasicRow, RowGroup } from "@/components/common/rows";
import { DATE_FORMAT } from "@/constants/date";
import { Button, Group, InputBase, NumberInput, Select, Stack } from "@mantine/core";
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

export interface AchievementFormInput {
  performance: AchievementType;
  journalName: string;
  paperTitle: string;
  ISSN1: string;
  ISSN2: string;
  publicationDate: Date;
  authorType: AchievementAuthorType;
  authorNumbers: number;
}

interface Props<T> {
  form: UseFormReturnType<T>;
  handleSubmit: (input: T) => void;
  isEdit?: boolean;
}

function AchievementForm<T>({ form, handleSubmit, isEdit }: Props<T>) {
  const { onSubmit, getInputProps } = form;

  const transformedAchievementTypeList = Object.entries(ACHIEVEMENT_TYPE_LOOKUP_TABLE).map(
    ([key, value]) => ({ value: key, label: value })
  );
  const transformedAuthorTypeList = Object.entries(ACHIEVEMENT_AUTHOR_TYPE_LOOKUP_TABLE).map(
    ([key, value]) => ({ value: key, label: value })
  );

  const handleDelete = () => {
    /**
     * @TODO: DELETE API 연결
     */
    console.log("deleted");
  };

  return (
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
              <InputBase w={100} component={IMaskInput} mask="0000" {...getInputProps("ISSN1")} />
              {" - "}
              <InputBase w={100} component={IMaskInput} mask="0000" {...getInputProps("ISSN2")} />
            </Group>
          </BasicRow>
        </RowGroup>
        <RowGroup>
          <BasicRow field="게재년월">
            <DateInput
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
        <RowGroup justify="center" withBorderBottom={false}>
          <Group ml="auto">
            <Button type="submit">{isEdit ? "수정하기" : "실적 등록"}</Button>
            {isEdit && (
              <Button color="red" onClick={handleDelete}>
                삭제하기
              </Button>
            )}
          </Group>
          <Button component="a" href="/student/achievement" variant="subtle" ml="auto">
            목록으로
          </Button>
        </RowGroup>
      </Stack>
    </form>
  );
}

export default AchievementForm;
