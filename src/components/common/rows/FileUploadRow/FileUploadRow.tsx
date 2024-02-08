"use client";

import { Button, Checkbox, FileInput, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Row from "@/components/common/rows/_elements/Row/Row";
import { UseFormReturnType } from "@mantine/form";

declare module "@mantine/core" {
  interface FileInputProps {
    placeholder?: string;
  }
}

export interface PreviousFile extends File {
  previousUuid: string;
}

interface Props {
  field: string;
  fieldSize?: "sm" | "md" | "lg" | "xl" | number;
  onChange?: (file: File | PreviousFile | null) => void;
  defaultFile?: File | PreviousFile;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  form?: UseFormReturnType<any>;
  formKey?: string;
}

function FileUploadRow({
  field,
  onChange,
  defaultFile,
  form,
  formKey = "file",
  fieldSize = "md",
}: Props) {
  const [file, setFile] = useState<File | PreviousFile | null>(null);
  const resetRef = useRef<() => void>(null);
  let isPreviousFile: boolean;
  const value = form?.values?.[formKey];
  if (value === null) {
    isPreviousFile = false;
  } else {
    isPreviousFile = "previousUuid" in value;
  }
  const initialPreviousFile = useMemo(
    () => (isPreviousFile ? value : null),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
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
        {/* form API와 함께 사용시 예기치 못한 동작이 발생하여 주석처리 */}
        {/* <FileButton onChange={handleFileChange} resetRef={resetRef}>
          {(props) => <Button {...props}>파일 선택</Button>}
        </FileButton> */}
        <FileInput
          style={{ width: 300 }}
          value={form ? undefined : file}
          onChange={handleFileChange}
          defaultValue={defaultFile}
          placeholder="파일 업로드..."
          {...form?.getInputProps(formKey)}
        >
          {file?.name}
        </FileInput>
        <Button
          color="red"
          variant="outline"
          leftSection={<IconTrash size={20} />}
          disabled={form ? !form.values[formKey] : !file}
          onClick={form ? () => form.setFieldValue(formKey, null) : clearFile}
        >
          삭제
        </Button>
        {initialPreviousFile && ( // 정말 대충 만들었으니 다시 쓸 일이 있으면 고쳐주세요...
          <>
            <Checkbox
              label="기존 파일 사용"
              ml="24px"
              checked={isPreviousFile}
              onChange={(checkbox) => {
                if (checkbox.target.checked) {
                  form?.setFieldValue(formKey, initialPreviousFile);
                } else {
                  form!.setFieldValue(formKey, null);
                }
              }}
            />
          </>
        )}
      </Group>
    </Row>
  );
}

export default FileUploadRow;
