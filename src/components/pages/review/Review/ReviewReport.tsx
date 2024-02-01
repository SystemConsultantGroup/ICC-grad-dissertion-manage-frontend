import { Stack } from "@mantine/core";
import { DownloadButton } from "@/components/common/Buttons";
import { BasicRow, RowGroup, TitleRow } from "@/components/common/rows";

export function ReviewReportAdmin() {
  return (
    <Stack gap={0}>
      <TitleRow title="심사 보고서" />
      <RowGroup>
        <BasicRow field="최종 심사 결과">
          <BasicRow.Text>합격</BasicRow.Text>
        </BasicRow>
      </RowGroup>
      <RowGroup>
        <BasicRow field="심사 보고서">
          <DownloadButton link="." />
        </BasicRow>
      </RowGroup>
    </Stack>
  );
}
