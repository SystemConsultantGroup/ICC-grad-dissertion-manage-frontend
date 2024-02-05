"use client";

import { File } from "@/api/_types/file";
import { ClientAxios } from "@/api/ClientAxios";
import { API_ROUTES } from "@/api/apiRoute";
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
      name={file?.name ?? ""}
      url={file ? ClientAxios.getUri({ url: API_ROUTES.file.get(file.uuid) }) : ""}
    />
  );
}

export default ApiFilePostRow;
