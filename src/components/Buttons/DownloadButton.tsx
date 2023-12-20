import { Button, ButtonProps } from "@mantine/core";

interface Props extends ButtonProps {
  link: string;
}

export function DownloadButton({ link, ...props }: Props) {
  return (
    <Button component="a" target="_blank" href={link} download {...props}>
      다운로드
    </Button>
  );
}
