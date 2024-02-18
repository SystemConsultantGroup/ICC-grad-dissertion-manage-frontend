"use client";

import { handleDownloadFile } from "@/api/_utils/handleDownloadFile";
import { Button, ButtonProps } from "@mantine/core";
import saveAs from "file-saver";
import { ReactNode } from "react";

interface Props extends ButtonProps {
  disabled?: boolean;
  fileName: string;
  link: string;
  saveFile?: "default" | "api"; // note: enum, rather then function, to support SSR
  children?: ReactNode;
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

export function DownloadButton({ disabled, fileName, link, saveFile, children, ...props }: Props) {
  // DownloadButton as link is impossible; to make it possible,
  // - /v1/files/:key should accept cookie as valid authorization method,
  // - make wrapper with next, which accept cookie as authorization.
  return (
    <Button
      // component="a"
      // target="_blank"
      // href={link}
      // download
      data-disabled={!!disabled}
      // onClick={disabled ? (event) => event.preventDefault() : undefined}
      onClick={() => {
        if (!disabled) {
          let handler;
          if (saveFile === "api") {
            handler = handleDownloadFile;
          } else {
            handler = defaultSaveFile;
          }
          handler({ fileName, fileLink: link });
        }
      }}
      disabled={!!disabled}
      {...props}
    >
      {children || "다운로드"}
    </Button>
  );
}
