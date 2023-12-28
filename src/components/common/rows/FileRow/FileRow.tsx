import { Group, UnstyledButton } from "@mantine/core";
import { IconFileMinus } from "@tabler/icons-react";
import Row from "@/components/common/rows/_elements/Row/Row";
import { saveAs } from "file-saver";

interface Props {
  field: string;
  url: string;
  name: string;
}

function FilePostRow({ field, url, name }: Props) {
  const saveFile = async () => {
    const response = await fetch(url);
    const blob = await response.blob();
    saveAs(blob, name);
  };
  return (
    <Row field={field} fieldSize="sm">
      <Group gap={16}>
        <IconFileMinus size={24} />
        <UnstyledButton onClick={saveFile}>
          <Row.Text>{name}</Row.Text>
        </UnstyledButton>
      </Group>
    </Row>
  );
}

export default FilePostRow;
