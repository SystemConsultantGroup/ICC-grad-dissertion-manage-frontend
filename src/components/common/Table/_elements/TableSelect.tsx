import { Select, SelectProps } from "@mantine/core";

interface Props extends SelectProps {}

function TableSelect(props: Props) {
  return (
    <Select
      {...props}
      styles={{
        wrapper: {
          width: "100%",
        },
      }}
    />
  );
}

export default TableSelect;
