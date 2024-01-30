"use client";

import { Button, ButtonProps } from "@mantine/core";

interface Props extends ButtonProps {
  disabled?: boolean;
  link: string;
}

export function DownloadButton({ disabled, link, ...props }: Props) {
  return (
    <Button
      component="a"
      target="_blank"
      href={link}
      download
      data-disabled={!!disabled}
      onClick={disabled ? (event) => event.preventDefault() : undefined}
      disabled={!!disabled}
      {...props}
    >
      다운로드
    </Button>
  );
}
