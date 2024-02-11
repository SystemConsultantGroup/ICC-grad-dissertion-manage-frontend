import { BasicRow, ButtonRow, RowGroup, TitleRow } from "@/components/common/rows";
import { Button, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export interface RevisionCheckProps {
  form: UseFormReturnType<{ checked: boolean }>;
  isPending: boolean;
}

export function RevisionCheck({ form, isPending }: RevisionCheckProps) {
  const { checked } = form.values;
  const router = useRouter();

  return (
    <Stack gap={0}>
      <TitleRow title="수정 지시사항 확인" />
      <RowGroup>
        <BasicRow field="확인 완료 표시">
          <Button
            leftSection={checked && <IconCheck size={18} />}
            variant={checked ? "filled" : "outline"}
            color="green"
            onClick={() => form.setFieldValue("checked", !checked)}
          >
            확인
          </Button>
        </BasicRow>
      </RowGroup>
      <RowGroup withBorderBottom={false}>
        <ButtonRow
          buttons={[
            <Button key="final" color="blue" type="submit" loading={isPending}>
              저장하기
            </Button>,
            <Button key="back" variant="outline" onClick={() => router.push("../revision")}>
              목록으로
            </Button>,
          ]}
        />
      </RowGroup>
    </Stack>
  );
}
