import { Status } from "@/api/_types/common";
import { Group, Button, MantineColor } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { PropsWithChildren } from "react";

export interface StatusButtonsProps extends PropsWithChildren {
  options: { unexamined?: boolean; pending?: boolean };
  value: Status;
  setValue: (newValue: Status) => void;
}

export function StatusButtons({ options, value, setValue, children }: StatusButtonsProps) {
  const select = (status: Status) => {
    if (status === value && options.unexamined) {
      setValue("UNEXAMINED");
    } else {
      setValue(status);
    }
  };

  return (
    <Group role="radiogroup">
      <Item value={value} select={select} status="PASS" color="green" content="합격" />
      <Item value={value} select={select} status="FAIL" color="red" content="불합격" />
      {options.pending && (
        <Item value={value} select={select} status="PENDING" color="violet" content="보류" />
      )}
      {children}
    </Group>
  );
}

function Item({
  value,
  select,
  status,
  color,
  content,
}: {
  value: Status;
  select: (newValue: Status) => void;
  status: Status;
  color: MantineColor;
  content: string;
}) {
  const current = value === status;
  return (
    <Button
      role="radio"
      aria-checked={current}
      leftSection={current && <IconCheck size={18} />}
      variant={current ? "filled" : "outline"}
      color={color}
      onClick={() => select(status)}
    >
      {content}
    </Button>
  );
}
