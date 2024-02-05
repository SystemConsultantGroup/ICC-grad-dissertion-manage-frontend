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
  disabled?: boolean;
}

function FilePostRow({ field, fieldSize, url, name, disabled }: Props) {
  const saveFile = async () => {
    const response = await fetch(url);
    const blob = await response.blob();
    saveAs(blob, name);
  };
  return (
    <Row field={field} fieldSize={fieldSize}>
      <UnstyledButton disabled={disabled} opacity={disabled ? 0.6 : 1} onClick={saveFile}>
        <Group gap={16}>
          <IconDownload size={24} />
          <Row.Text>{name}</Row.Text>
        </Group>
      </UnstyledButton>
    </Row>
  );
}

export default FilePostRow;
