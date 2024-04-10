"use client";

import { useEffect, useState } from "react";
import { Button, FileInput, Group } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import Row from "@/components/common/rows/_elements/Row/Row";
import { File as ApiFile } from "@/api/_types/file";
import { handleDownloadFile } from "@/api/_utils/handleDownloadFile";
import { API_ROUTES } from "@/api/apiRoute";
import classes from "./FileUploadRow.module.css";

declare module "@mantine/core" {
  interface FileInputProps {
    placeholder?: string;
  }
}

interface Props {
  field: string;
  fieldSize?: "sm" | "md" | "lg" | "xl" | number;
  onChange?: (file: File | null) => void;
  previousFile?: ApiFile;
  defaultFile?: File;
  required?: boolean;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  form?: UseFormReturnType<any>;
  formKey?: string;
}

/**
 * previousFile이 있을 경우, `form.values[formKey]`의 값이
 * - undefined일 경우, 기존 파일을 사용합니다. '덮어쓰기', '(기존 파일) 다운로드' 버튼이 표출됩니다.
 * - null일 경우, 기존 파일을 삭제합니다. '삭제' 버튼은 비활성화되고, '기존 파일 사용' 버튼이 표출됩니다.
 * - File일 경우, 기존 파일을 해당 파일로 덮어씁니다. '삭제', '기존 파일 사용' 버튼이 표출됩니다.
 */
function FileUploadRow({
  field,
  onChange,
  previousFile,
  defaultFile,
  required,
  form,
  formKey = "file",
  fieldSize = "md",
}: Props) {
  const [file, setFile] = useState<File | null>(null);

  const formValue = form?.values?.[formKey];
  const usePrevious = previousFile && formValue === undefined;

  const clearFile = () => {
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
        <FileInput
          style={{ width: 300 }}
          className={usePrevious ? classes.previous : undefined}
          onChange={handleFileChange}
          required={required}
          defaultValue={defaultFile}
          placeholder={usePrevious ? previousFile.name : "파일 업로드..."}
          {...form?.getInputProps(formKey)}
          value={form ? formValue || null : file}
        />
        {(!required || usePrevious) && (
          <Button
            color="red"
            variant="outline"
            leftSection={<IconTrash size={20} />}
            disabled={form ? formValue === null : !file}
            onClick={form ? () => form.setFieldValue(formKey, null) : clearFile}
          >
            {usePrevious ? "덮어쓰기" : "삭제"}
          </Button>
        )}
        {previousFile &&
          (formValue === undefined ? (
            <Button
              color="gray"
              variant="outline"
              onClick={() => {
                handleDownloadFile({
                  fileLink: API_ROUTES.file.get(previousFile.uuid),
                  fileName: previousFile.name,
                });
              }}
            >
              다운로드
            </Button>
          ) : (
            <Button
              color="gray"
              variant="outline"
              onClick={() => form!.setFieldValue(formKey, undefined)}
            >
              기존 파일 사용
            </Button>
          ))}
      </Group>
    </Row>
  );
}

export default FileUploadRow;
