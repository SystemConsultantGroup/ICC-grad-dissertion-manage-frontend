import { Dispatch, SetStateAction } from "react";
import { Group, Radio, RadioGroup } from "@mantine/core";
import RowGroup from "@/components/common/rows/RowGroup/RowGroup";

interface Props {
  commentType?: string;
  setCommentType: Dispatch<SetStateAction<string | undefined>>;
}

function CommentTypeRow({ commentType, setCommentType }: Props) {
  return (
    <RowGroup>
      <RadioGroup value={commentType} onChange={setCommentType}>
        <Group>
          <Radio label="심사 의견" value="심사 의견" />
          <Radio label="심사 의견 파일" value="심사 의견 파일" />
        </Group>
      </RadioGroup>
    </RowGroup>
  );
}

export default CommentTypeRow;
