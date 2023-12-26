"use client";

import { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { MantineStyleProp, Group, Text, TextInput } from "@mantine/core";

const DEBOUNCE_VALUE = 500;

interface Props {
  onChange?: (search: string) => void;
  onInvalid?: (invalid: boolean) => void;
  style?: MantineStyleProp;
}

function SearchInput({ onChange, onInvalid, style }: Props) {
  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, DEBOUNCE_VALUE);

  useEffect(() => {
    onInvalid?.(true);
  }, [value, onInvalid]);

  useEffect(() => {
    onChange?.(debounced);
    onInvalid?.(false);
  }, [debounced, onChange, onInvalid]);

  return (
    <Group gap={20} style={style}>
      <Text c="blue" fz="sm">
        검색:
      </Text>
      <TextInput
        c="blue"
        rightSection={<IconSearch size={20} />}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
      />
    </Group>
  );
}

export default SearchInput;
