import { BasicRow, RowGroup, TitleRow } from "@/components/common/rows";
import { Button, Stack } from "@mantine/core";

export function ExamineResult() {
  return (
    <Stack gap={0}>
      <TitleRow title="심사 결과" />
      <RowGroup>
        <BasicRow field="합격 여부">
          <BasicRow.Text>
            <b>합격</b>
          </BasicRow.Text>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="심사 의견">
          <BasicRow.Text>월월월월월</BasicRow.Text>
        </BasicRow>
      </RowGroup>
    </Stack>
  );
}

export function StudentExamineResult() {
  return (
    <Stack gap={0}>
      <TitleRow title="심사 결과" />
      <RowGroup>
        <BasicRow field="예심">
          <BasicRow.Text>
            <b>합격</b>
          </BasicRow.Text>
        </BasicRow>
        <BasicRow field="본심">
          <BasicRow.Text>대기중</BasicRow.Text>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="심사 의견">
          <BasicRow.Text>월월월월월</BasicRow.Text>
          <Button variant="outline">자세히 보기</Button>
        </BasicRow>
      </RowGroup>
    </Stack>
  );
}
