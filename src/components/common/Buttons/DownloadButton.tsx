import { Button, ButtonProps } from "@mantine/core";
import { MouseEventHandler } from "react";

interface Props extends ButtonProps {
  disabled?: boolean;
  link: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function DownloadButton({ disabled, link, onClick, ...props }: Props) {
  return (
    <Button
      component="a"
      target="_blank"
      href={link}
      download
      data-disabled={!!disabled}
      onClick={disabled ? (event) => event.preventDefault() : onClick}
      disabled={!!disabled}
      {...props}
    >
      다운로드
    </Button>
  );
}
