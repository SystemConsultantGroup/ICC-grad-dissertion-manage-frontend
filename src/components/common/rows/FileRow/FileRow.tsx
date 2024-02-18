"use client";

import { Group, UnstyledButton } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import Row from "@/components/common/rows/_elements/Row/Row";
import { saveAs } from "file-saver";

interface Props {
  field: string;
  fieldSize?: "sm" | "md" | "lg" | "xl";
  url: string;
  saveFile?: (params: { fileLink: string; fileName: string }) => Promise<void>;
  name: string;
  disabled?: boolean;
}

async function defaultSaveFile({
  fileLink: url,
  fileName: name,
}: {
  fileLink: string;
  fileName: string;
}) {
  const response = await fetch(url);
  const blob = await response.blob();
  saveAs(blob, name);
}

function FilePostRow({ field, fieldSize, url, saveFile = defaultSaveFile, name, disabled }: Props) {
  return (
    <Row field={field} fieldSize={fieldSize}>
      <UnstyledButton
        disabled={disabled}
        opacity={disabled ? 0.6 : 1}
        onClick={() => saveFile({ fileLink: url, fileName: name })}
      >
        <Group gap={16}>
          <IconDownload size={24} />
          <Row.Text>{name}</Row.Text>
        </Group>
      </UnstyledButton>
    </Row>
  );
}

export default FilePostRow;
