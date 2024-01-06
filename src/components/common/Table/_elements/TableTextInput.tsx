import { TextInput, TextInputProps } from "@mantine/core";

interface Props extends TextInputProps {}

function TableTextInput(props: Props) {
  return <TextInput {...props} />;
}

export default TableTextInput;
