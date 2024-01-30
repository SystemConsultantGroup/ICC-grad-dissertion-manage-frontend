import { BasicRow, ButtonRow, FileUploadRow, RowGroup, TitleRow } from "@/components/common/rows";
import { Button, Stack } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

export interface RevisionCheckProps {
  checked?: boolean;
  setChecked: Dispatch<SetStateAction<boolean | undefined>>;
}

export function RevisionCheck({ checked, setChecked }: RevisionCheckProps) {
  return (
    <Stack gap={0}>
      <TitleRow title="수정 지시사항 확인" />
      <RowGroup>
        <FileUploadRow field="서명 파일 업로드" />
      </RowGroup>
      <RowGroup>
        <BasicRow field="확인하기">
          <Button
            leftSection={checked && <IconCheck size={18} />}
            variant={checked ? "filled" : "outline"}
            color="green"
            onClick={() => setChecked(true)}
          >
            확인
          </Button>
        </BasicRow>
      </RowGroup>
      <RowGroup withBorderBottom={false}>
        <ButtonRow
          buttons={[
            <Button key="final" color="blue">
              저장하기
            </Button>,
            <Button key="back" variant="outline" onClick={() => {}}>
              목록으로
            </Button>,
          ]}
        />
      </RowGroup>
    </Stack>
  );
}
