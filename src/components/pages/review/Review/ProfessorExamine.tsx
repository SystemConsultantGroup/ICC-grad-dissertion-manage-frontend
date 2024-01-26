import { Button, Group, Stack } from "@mantine/core";
import {
  BasicRow,
  ButtonRow,
  FileUploadRow,
  RowGroup,
  TextAreaRow,
  TitleRow,
} from "@/components/common/rows";

export interface ProfessorExamineProps {
  onTemporarySave: () => void;
  onSave: () => void;
}

export function ProfessorExamine({ onTemporarySave, onSave }: ProfessorExamineProps) {
  return (
    <Stack gap={0}>
      <TitleRow title="심사하기" />
      <RowGroup>
        <BasicRow field="합격 여부">
          <Group>
            <Button color="blue">합격</Button>
            <Button color="red">불합격</Button>
            <Button variant="outline">보류</Button>
          </Group>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <TextAreaRow field="심사 의견" />
      </RowGroup>
      <RowGroup>
        <FileUploadRow field="심사 의견 파일" />
      </RowGroup>
      <RowGroup>
        <ButtonRow
          buttons={[
            <Button key="temp" color="grape" variant="outline" onClick={onTemporarySave}>
              임시저장
            </Button>,
            <Button key="temp" color="blue" onClick={onSave}>
              최종저장
            </Button>,
          ]}
        />
      </RowGroup>
    </Stack>
  );
}
