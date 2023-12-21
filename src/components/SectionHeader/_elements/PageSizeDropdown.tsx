import { Dispatch, SetStateAction } from "react";
import { Select } from "@mantine/core";
import { PAGE_SIZES } from "../../../constants/pageSize";
import classes from "./PageSizeDropdown.module.css";

export interface PaginationDataProps {
  pageSize?: string | null;
  setPageSize?: Dispatch<SetStateAction<string | null>>;
}

function PageSizeDropdown({ pageSize, setPageSize }: PaginationDataProps) {
  return (
    <Select
      className={classes.wrapper}
      placeholder="선택"
      // eslint-disable-next-line @typescript-eslint/no-shadow
      data={PAGE_SIZES.map((pageSize) => ({ label: String(pageSize), value: String(pageSize) }))}
      defaultValue={String(pageSize)}
      onChange={setPageSize}
    />
  );
}

export default PageSizeDropdown;
