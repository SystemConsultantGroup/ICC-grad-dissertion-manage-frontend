"use client";

import { Button, FileInput, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Row from "@/components/common/rows/_elements/Row/Row";
import { UseFormReturnType } from "@mantine/form";
import { handleDownloadFile } from "@/api/_utils/handleDownloadFile";
import { API_ROUTES } from "@/api/apiRoute";
import classes from "./FileUploadRow.module.css";

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
  let previousFile: PreviousFile | null;
  const value: File | PreviousFile | null = form?.values?.[formKey];
  if (value === null) {
    previousFile = null;
  } else {
    previousFile = "previousUuid" in value ? value : null;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialPreviousFile = useMemo(() => previousFile, []);
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
          className={previousFile ? classes.previous : undefined}
          value={form ? undefined : file}
          onChange={handleFileChange}
          defaultValue={defaultFile}
          placeholder="파일 업로드..."
          {...form?.getInputProps(formKey)}
        />
        <Button
          color="red"
          variant="outline"
          leftSection={<IconTrash size={20} />}
          disabled={form ? !form.values[formKey] : !file}
          onClick={form ? () => form.setFieldValue(formKey, null) : clearFile}
        >
          {previousFile ? "덮어쓰기" : "삭제"}
        </Button>
        {initialPreviousFile &&
          (previousFile ? (
            <Button
              color="gray"
              variant="outline"
              onClick={() => {
                handleDownloadFile({
                  fileLink: API_ROUTES.file.get(previousFile!.previousUuid),
                  fileName: previousFile!.name,
                });
              }}
            >
              다운로드
            </Button>
          ) : (
            <Button
              color="gray"
              variant="outline"
              onClick={() => form!.setFieldValue(formKey, initialPreviousFile)}
            >
              기존 파일 사용
            </Button>
          ))}
      </Group>
    </Row>
  );
}

export default FileUploadRow;
