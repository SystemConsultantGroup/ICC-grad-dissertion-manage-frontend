import SectionTitle from "@/components/common/SectionTitle";
import { NoticeRow, TitleRow } from "@/components/common/rows";
import { Button, Group, Modal as MantineModal, Stack } from "@mantine/core";
import { PropsWithChildren } from "react";

export interface ReviewConfirmModalProps extends PropsWithChildren {
  opened: boolean;
  onClose: () => void;
}

export function ReviewConfirmModal({ opened, onClose, children }: ReviewConfirmModalProps) {
  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      padding="lg"
      radius="lg"
      size="lg"
      styles={{ content: { overflowY: "hidden" }, body: { height: "80vh" } }}
    >
      <Stack gap={0} style={{ height: "100%" }}>
        <Stack style={{ flexShrink: 0 }} gap={0}>
          <TitleRow
            title={<SectionTitle>심사 결과 최종저장</SectionTitle>}
            style={{ borderBottomWidth: 0, marginBottom: -4 }}
          />
          <NoticeRow
            text="최종저장 후에는 심사 결과를 다시 수정할 수 없습니다."
            withBorderBottom={false}
          />
        </Stack>
        <Stack style={{ overflowY: "auto", flex: "1 0 0" }}>{children}</Stack>
        <Stack style={{ flexShrink: 0 }} gap={0}>
          <Group justify="center" mt={36}>
            <Button key="cancel" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button key="save" color="orange">
              최종저장
            </Button>
          </Group>
        </Stack>
      </Stack>
    </MantineModal>
  );
}
