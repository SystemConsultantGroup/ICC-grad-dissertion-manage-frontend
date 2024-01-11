"use client";

import { Button, FileButton, FileInput, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import Row from "@/components/common/rows/_elements/Row/Row";
import { UseFormReturnType } from "@mantine/form";

interface Props {
  field: string;
  onChange?: (file: File | null) => void;
  defaultFile?: File;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  form?: UseFormReturnType<any>;
  formKey?: string;
}

function FileUploadRow({ field, onChange, defaultFile, form, formKey = "file" }: Props) {
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
    <Row field={field}>
      <Group gap={16}>
        {/* form API와 함께 사용시 예기치 못한 동작이 발생하여 주석처리 */}
        {/* <FileButton onChange={handleFileChange} resetRef={resetRef}>
          {(props) => <Button {...props}>파일 선택</Button>}
        </FileButton> */}
        <FileInput
          style={{ width: 300 }}
          value={form ? undefined : file}
          onChange={handleFileChange}
          defaultValue={defaultFile}
          {...form?.getInputProps(formKey)}
        >
          {file?.name}
        </FileInput>
        <Button
          color="red"
          variant="outline"
          leftSection={<IconTrash size={20} />}
          disabled={form ? !form.values[formKey] : !file}
          onClick={form ? () => form.setValues({ ...form.values, [formKey]: null }) : clearFile}
        >
          삭제
        </Button>
      </Group>
    </Row>
  );
}

export default FileUploadRow;
