"use client";

import { Group, Text, useMantineTheme } from "@mantine/core";
import { DownloadButton } from "@/components/common/Buttons";

export interface Props {
  fileName: string;
  fileLink: string;
}

function FileDownload({ fileName, fileLink }: Props) {
  const theme = useMantineTheme();

  return (
    <Group gap={16}>
      <Text
        styles={{
          root: {
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            fontWeight: theme.other.fontWeights.bold,
          },
        }}
      >
        {fileName}
      </Text>
      <DownloadButton link={fileLink} />
    </Group>
  );
}

export default FileDownload;
