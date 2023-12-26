import { TextInput, TextInputProps } from "@mantine/core";

interface Props extends TextInputProps {}

function TableTextInput(props: Props) {
  return (
    <div>
      <TextInput
        {...props}
        styles={{
          wrapper: {
            width: "100%",
          },
        }}
      />
    </div>
  );
}

export default TableTextInput;
