import { Group, Text, MantineStyleProp } from "@mantine/core";
import SearchInput from "@/components/common/SearchInput";
import PageSizeDropdown, {
  PaginationDataProps,
} from "@/components/common/SectionHeader/_elements/PageSizeDropdown";
import SectionHeaderButtonContainer from "@/components/common/SectionHeader/_elements/SectionHeaderButtonContainer";
import { ReactNode } from "react";

interface Props extends PaginationDataProps {
  total?: number;
  startIndex?: number;
  endIndex?: number;
  style?: MantineStyleProp;
  onSearchChange?: (search: string) => void;
  onInvalidChange?: (invalid: boolean) => void;
  withPageSizeSelector?: boolean; // - 개 씩 보기 드롭다운 추가 여부
  withSearchBar?: boolean; // 검색 바 추가 여부
  children?: ReactNode; // 우측 끝에 들어갈 컴포넌트/element
}

function SectionHeader({
  total,
  startIndex,
  endIndex,
  style,
  onSearchChange,
  onInvalidChange,
  pageSize,
  setPageSize,
  withPageSizeSelector = false,
  withSearchBar = true,
  children,
}: Props) {
  // withPageSizeSelector가 true일 때, pageSize와 setPageSize가 없으면 에러 발생
  if (withPageSizeSelector) {
    if (!pageSize || !setPageSize) {
      throw new Error("withPageSizeSelector 사용 시 pageSize와 setPageSize는 필수입니다.");
    }
  }

  return (
    <Group justify="space-between" style={style}>
      <Group>
        {withPageSizeSelector && pageSize && setPageSize && (
          <>
            <PageSizeDropdown pageSize={pageSize} setPageSize={setPageSize} />
            <Text>개씩 보기</Text>
          </>
        )}
        <Text c="gray">
          총 {total ?? "..."}개 중 {startIndex ?? "..."}에서 {endIndex ?? "..."}번째
        </Text>
      </Group>
      {/* children 과 widthSearchBar 이 동시에 true 일 경우 예측할 수 없는 행동을 보일 수 있음.  */}
      <Group gap={20}>
        {withSearchBar && <SearchInput onChange={onSearchChange} onInvalid={onInvalidChange} />}
        {children}
      </Group>
    </Group>
  );
}

SectionHeader.Buttons = SectionHeaderButtonContainer;
export default SectionHeader;
