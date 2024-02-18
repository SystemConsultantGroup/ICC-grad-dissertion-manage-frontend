import { File } from "@/api/_types/file";
import { ButtonProps } from "@mantine/core";
import { downloadUrlForUuid } from "@/api/_utils/handleDownloadFile";
import { DownloadButton } from "./DownloadButton";

export function ApiDownloadButton({
  file,
  ...props
}: ButtonProps & { file: File | undefined | null }) {
  return (
    <DownloadButton
      fileName={file?.name ?? ""}
      link={file ? downloadUrlForUuid(file.uuid) : (null as unknown as string)}
      saveFile="api"
      disabled={!file}
      {...props}
    />
  );
}
