"use client";

import { Button, FileButton, FileInput, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import Row from "@/components/common/rows/_elements/Row/Row";

interface Props {
  field: string;
  fieldSize?: "sm" | "md" | "lg" | "xl";
  onChange?: (file: File | null) => void;
  defaultFile?: File;
}

function FileUploadRow({ field, fieldSize, onChange, defaultFile }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);
  const clearFile = () => {
    resetRef.current?.();
    setFile(null);
    onChange?.(null);
  };
  const handleFileChange = (f: File | null) => {
    setFile(f);
    onChange?.(f);
  };

  useEffect(() => {
    if (defaultFile && !file) {
      setFile(defaultFile);
    }
  }, [defaultFile]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Row field={field} fieldSize={fieldSize}>
      <Group gap={16}>
        <FileButton onChange={handleFileChange} resetRef={resetRef}>
          {(props) => <Button {...props}>파일 선택</Button>}
        </FileButton>
        <FileInput
          style={{ width: 300 }}
          value={file}
          onChange={handleFileChange}
          defaultValue={defaultFile}
        >
          {file?.name}
        </FileInput>
        <Button
          color="red"
          variant="outline"
          leftSection={<IconTrash size={20} />}
          disabled={!file}
          onClick={clearFile}
        >
          삭제
        </Button>
      </Group>
    </Row>
  );
}

export default FileUploadRow;
