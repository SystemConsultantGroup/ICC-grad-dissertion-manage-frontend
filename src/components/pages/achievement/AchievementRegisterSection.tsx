"use client";

import { Button, Group, InputBase, NumberInput, Select, Stack } from "@mantine/core";
import TitleRow from "@/components/common/rows/TitleRow/TitleRow";
import { BasicRow, RowGroup } from "@/components/common/rows";
import { DateInput } from "@mantine/dates";
import {
  ACHIEVEMENT_AUTHOR_TYPE_LOOKUP_TABLE,
  ACHIEVEMENT_TYPE_LOOKUP_TABLE,
  AchievementAuthorType,
  AchievementType,
} from "@/api/_types/achievement";
import { IMaskInput } from "react-imask";
import { IconCalendar } from "@tabler/icons-react";
import { DATE_FORMAT } from "@/constants/date";
import { isNotEmpty, useForm } from "@mantine/form";

interface AchievementRegisterFormInput {
  performance: AchievementType;
  journalName: string;
  paperTitle: string;
  ISSN1: string;
  ISSN2: string;
  publicationDate: Date;
  authorType: AchievementAuthorType;
  authorNumbers: number;
}

function AchievementRegisterSection() {
  const transfromedAchievementTypeList = Object.entries(ACHIEVEMENT_TYPE_LOOKUP_TABLE).map(
    ([key, value]) => ({ value: key, label: value })
  );
  const transfromedAuthorTypeList = Object.entries(ACHIEVEMENT_AUTHOR_TYPE_LOOKUP_TABLE).map(
    ([key, value]) => ({ value: key, label: value })
  );

  const { getInputProps, onSubmit } = useForm<AchievementRegisterFormInput>({
    validate: {
      performance: isNotEmpty("논문 실적 구분을 입력하세요."),
      paperTitle: isNotEmpty("논문/특허 제목을 입력하세요."),
      journalName: isNotEmpty("학술지명/학술대회명을 입력하세요."),
      publicationDate: isNotEmpty("게재년월을 입력하세요."),
      authorType: isNotEmpty("주저자 여부를 입력하세요."),
      authorNumbers: isNotEmpty("저자 수를 입력하세요."),
    },
  });

  const handleSubmit = (input: AchievementRegisterFormInput) => {
    console.log(input);
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Stack gap={0}>
        <TitleRow title="연구실적 등록" />
        <RowGroup>
          <BasicRow field="논문 실적 구분">
            <Select
              w={400}
              allowDeselect={false}
              data={transfromedAchievementTypeList}
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
            <Select w={300} data={transfromedAuthorTypeList} {...getInputProps("authorType")} />
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
          <Button type="submit" ml="auto">
            실적 등록
          </Button>
          <Button component="a" href="/student/achievement" variant="subtle" ml="auto">
            목록으로
          </Button>
        </RowGroup>
      </Stack>
    </form>
  );
}

export default AchievementRegisterSection;
