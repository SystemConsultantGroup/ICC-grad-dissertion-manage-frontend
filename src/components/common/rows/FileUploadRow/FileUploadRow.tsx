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
  /* eslint-disable @typescript-eslint/no-explicit-any */
  form?: UseFormReturnType<any>;
  formKey?: string;
}

/**
 * 참고로, form으로 사용할 때 값이 undefined면 기존 파일 사용, null이면 기존 파일을 삭제하는 것으로 간주합니다.
 * props 구조가 form, formKey로 되어 있으니 타입을 주기가 좀 복잡하네요...
 */
function FileUploadRow({
  field,
  onChange,
  previousFile,
  defaultFile,
  form,
  formKey = "file",
  fieldSize = "md",
}: Props) {
  const [file, setFile] = useState<File | null>(null);
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
          className={previousFile ? classes.previous : undefined}
          value={file}
          onChange={handleFileChange}
          defaultValue={defaultFile}
          placeholder="파일 업로드..."
          {...form?.getInputProps(formKey)}
        />
        <Button
          color="red"
          variant="outline"
          leftSection={<IconTrash size={20} />}
          disabled={form ? form.values[formKey] === null : !file}
          onClick={form ? () => form.setFieldValue(formKey, null) : clearFile}
        >
          {previousFile ? "덮어쓰기" : "삭제"}
        </Button>
        {previousFile &&
          (form?.values[formKey] ? (
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
