"use client";

import { Button, Stack, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import classes from "./SuccessAlert.module.css";

interface Props {
  message: string;
  subMessage?: string;
}

function SuccessAlert({ message, subMessage }: Props) {
  const router = useRouter();

  return (
    <Stack justify="center" align="center" gap={30} m={60}>
      <IconCheck size={100} className={classes.successIcon} />
      <Stack gap={10} align="center">
        <Text size="xl" fw="bold" fz={28}>
          {message}
        </Text>{" "}
        {subMessage && (
          <Text size="sm" c="gray" fz={20}>
            {subMessage}
          </Text>
        )}
      </Stack>
      <Button
        color="blue"
        size="md"
        radius="md"
        onClick={() => {
          router.back();
        }}
      >
        이전 페이지로
      </Button>
    </Stack>
  );
}

export default SuccessAlert;
