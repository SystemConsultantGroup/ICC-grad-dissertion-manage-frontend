"use client";

import { useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";
import { useDebouncedState } from "@mantine/hooks";
import { MantineStyleProp, Group, Text, TextInput } from "@mantine/core";

const DEBOUNCE_VALUE = 500;

interface Props {
  onChange?: (search: string) => void;
  sx?: MantineStyleProp;
}

function SearchInput({ onChange, sx }: Props) {
  const [debouncedInput, setDebouncedInput] = useDebouncedState("", DEBOUNCE_VALUE);

  useEffect(() => {
    onChange?.(debouncedInput);
  }, [debouncedInput, onChange]);

  return (
    <Group gap={20} style={sx}>
      <Text c="blue" fz="sm">
        검색:
      </Text>
      <TextInput
        c="blue"
        rightSection={<IconSearch size={20} />}
        onChange={(event) => {
          setDebouncedInput(event.currentTarget.value);
        }}
      />
    </Group>
  );
}

export default SearchInput;
