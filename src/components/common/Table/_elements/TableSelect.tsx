import { Select, SelectProps } from "@mantine/core";

interface Props extends SelectProps {}

function TableSelect(props: Props) {
  return (
    <div>
      <Select
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

export default TableSelect;
