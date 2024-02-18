"use client";

import { File } from "@/api/_types/file";
import { downloadUrlForUuid, handleDownloadFile } from "@/api/_utils/handleDownloadFile";
import FilePostRow from "./FileRow";

interface Props {
  field: string;
  fieldSize?: "sm" | "md" | "lg" | "xl";
  file: File | null | undefined;
}

function ApiFilePostRow({ field, fieldSize, file }: Props) {
  return (
    <FilePostRow
      field={field}
      disabled={!file}
      fieldSize={fieldSize}
      name={file?.name ?? "(파일 없음)"}
      url={file ? downloadUrlForUuid(file.uuid) : ""}
      saveFile={handleDownloadFile}
    />
  );
}

export default ApiFilePostRow;
