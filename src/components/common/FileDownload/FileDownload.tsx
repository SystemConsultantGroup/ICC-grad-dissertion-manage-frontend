import { ActionIcon, Group, Text } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
// import { handleDownloadFile } from "utils/api/handleDownloadFile";
import classes from "./FileDownload.module.css";

export interface Props {
  fileName: string;
  fileLink: string;
}

function FileDownload({ fileName, fileLink }: Props) {
  return (
    <Group gap={16}>
      <ActionIcon
        size={24}
        onClick={() => {
          // TODO: 파일다운로드 모듈함수 추가
          // handleDownloadFile({ fileLink, fileName });
        }}
      >
        <IconDownload />
      </ActionIcon>
      <Text className={classes.fileNameText}>{fileName}</Text>
    </Group>
  );
}

export default FileDownload;
