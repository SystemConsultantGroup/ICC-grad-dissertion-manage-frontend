import { Pagination as MantinePagination, PaginationProps } from "@mantine/core";

interface Props extends PaginationProps {}

function Pagination({ ...props }: Props) {
  return <MantinePagination defaultValue={1} color="dark" {...props} />;
}

export default Pagination;
