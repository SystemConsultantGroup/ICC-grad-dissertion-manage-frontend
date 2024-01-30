import { Button, Group, Stack } from "@mantine/core";
import {
  BasicRow,
  ButtonRow,
  FileUploadRow,
  RowGroup,
  TextAreaRow,
  TitleRow,
} from "@/components/common/rows";
import { Dispatch, SetStateAction } from "react";
import { IconCheck } from "@tabler/icons-react";
import Link from "next/link";
import { Status } from "./ProfessorReview";

export interface FinalReviewProps {
  status?: Status;
  setStatus: Dispatch<SetStateAction<Status | undefined>>;
  onTemporarySave: () => void;
  onSave: () => void;
}

export function FinalReview({ status, setStatus, onTemporarySave, onSave }: FinalReviewProps) {
  return (
    <Stack gap={0}>
      <TitleRow title="최종 심사하기" />
      <RowGroup>
        <BasicRow field="합격 여부">
          <Group>
            <Button
              leftSection={status === "PASS" && <IconCheck size={18} />}
              variant={status === "PASS" ? "filled" : "outline"}
              color="green"
              onClick={() => setStatus("PASS")}
            >
              합격
            </Button>
            <Button
              leftSection={status === "FAIL" && <IconCheck size={18} />}
              variant={status === "FAIL" ? "filled" : "outline"}
              color="red"
              onClick={() => setStatus("FAIL")}
            >
              불합격
            </Button>
            <Button
              leftSection={status === "PENDING" && <IconCheck size={18} />}
              variant={status === "PENDING" ? "filled" : "outline"}
              color="violet"
              onClick={() => setStatus("PENDING")}
            >
              보류
            </Button>
          </Group>
        </BasicRow>
      </RowGroup>
      <TextAreaRow field="심사 의견" />
      <RowGroup>
        <FileUploadRow field="심사 의견 파일" />
      </RowGroup>
      <RowGroup withBorderBottom={false}>
        <ButtonRow
          buttons={[
            <Button key="temp" color="grape" variant="outline" onClick={onTemporarySave}>
              임시저장
            </Button>,
            <Button key="final" color="blue" onClick={onSave}>
              최종저장
            </Button>,
            <Button key="back" variant="outline" component={Link} href="../final">
              목록으로
            </Button>,
          ]}
        />
      </RowGroup>
    </Stack>
  );
}
