"use client";

import { BasicRow, ButtonRow, FileUploadRow, RowGroup, TitleRow } from "@/components/common/rows";
import { Button, Stack } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";

export function RevisionCheck() {
  const [checked, setChecked] = useState<boolean>();

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
      <RowGroup>
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
