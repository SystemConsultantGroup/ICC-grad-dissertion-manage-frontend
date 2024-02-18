import { Group, Text, Textarea } from "@mantine/core";
import { ChangeEventHandler } from "react";
import { UseFormReturnType } from "@mantine/form";
import classes from "./TextAreaRow.module.css";

interface Props {
  field: string;
  content?: string;
  onChange?: ChangeEventHandler;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  form?: UseFormReturnType<any>;
  formKey?: string;
}

function TextAreaRow({ field, content, onChange, form, formKey = "content" }: Props) {
  return (
    <Group gap={0} className={classes.wrapper}>
      <Text className={classes.fieldText}>{field}</Text>
      <Textarea
        minRows={4}
        defaultValue={content}
        classNames={{
          root: classes.content,
          wrapper: classes.contentWrapper,
          input: classes.contentInput,
        }}
        onChange={onChange}
        {...form?.getInputProps(formKey)}
      />
    </Group>
  );
}
export default TextAreaRow;
