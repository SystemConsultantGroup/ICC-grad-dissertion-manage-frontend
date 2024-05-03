import { PropsWithChildren } from "react";
import { Button, Group, Modal as MantineModal, Stack } from "@mantine/core";
import SectionTitle from "@/components/common/SectionTitle";
import { NoticeRow, TitleRow } from "@/components/common/rows";
import { Status } from "@/api/_types/common";
import { ThesisInfo } from "../ThesisInfo";
import { ThesisInfoData } from "../ThesisInfo/ThesisInfo";
import { ReviewResult } from "../Review";

export interface ReviewConfirmModalProps extends PropsWithChildren {
  thesis: ThesisInfoData;
  review: {
    thesis: Status;
    presentation: Status | null;
    comment: string;
    commentFile: string | null;
  };
  opened: boolean;
  onConfirm: () => void;
  onClose: () => void;
  isFinal?: boolean;
}

export function ReviewConfirmModal({
  thesis,
  review,
  opened,
  onConfirm,
  onClose,
  isFinal,
}: ReviewConfirmModalProps) {
  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      padding="lg"
      radius="lg"
      size="lg"
      styles={{ content: { overflowY: "initial" } }}
    >
      <Stack gap={0} style={{ maxHeight: "76vh" }}>
        <Stack style={{ flexShrink: 0 }} gap={0}>
          <TitleRow
            title={<SectionTitle>심사 결과를 최종저장할까요?</SectionTitle>}
            style={{ borderBottomWidth: 0, marginBottom: -4 }}
          />
          <NoticeRow
            text="최종저장 후에는 심사 결과를 다시 수정할 수 없습니다."
            withBorderBottom={false}
          />
        </Stack>
        <Stack style={{ overflowY: "auto", flex: "0 1 auto" }}>
          <ThesisInfo thesis={thesis} simple />
          <ReviewResult
            stage={thesis.stage}
            thesis={review.thesis}
            presentation={review.presentation}
            comment={review.comment}
            commentFile={review.commentFile}
            isFinal={isFinal}
          />
        </Stack>
        <Stack style={{ flexShrink: 0 }} gap={0}>
          <Group justify="center" mt={36}>
            <Button key="cancel" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button
              key="save"
              color="orange"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              최종저장
            </Button>
          </Group>
        </Stack>
      </Stack>
    </MantineModal>
  );
}
