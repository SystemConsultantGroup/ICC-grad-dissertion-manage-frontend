"use client";

import { Group, UnstyledButton } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import Row from "@/components/common/rows/_elements/Row/Row";
import { saveAs } from "file-saver";

interface Props {
  field: string;
  fieldSize?: "sm" | "md" | "lg" | "xl";
  url: string;
  name: string;
}

function FilePostRow({ field, fieldSize, url, name }: Props) {
  const saveFile = async () => {
    const response = await fetch(url);
    const blob = await response.blob();
    saveAs(blob, name);
  };
  return (
    <Row field={field} fieldSize={fieldSize}>
      <UnstyledButton onClick={saveFile}>
        <Group gap={16}>
          <IconDownload size={24} />
          <Row.Text>{name}</Row.Text>
        </Group>
      </UnstyledButton>
    </Row>
  );
}

export default FilePostRow;
