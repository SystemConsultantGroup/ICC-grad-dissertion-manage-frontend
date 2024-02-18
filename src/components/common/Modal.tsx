import { Group, Modal as MantineModal, Stack, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { ReactNode } from "react";

interface Props {
  /** 모달 오픈 여부 */
  opened: boolean;
  /** 모달 닫을 때 실행할 콜백함수 */
  onClose: () => void;
  /**
   * 상단 아이콘 컴포넌트
   * @default IconAlertTriangle
   */
  icon?: ReactNode;
  /** 안내 제목 */
  title: string;
  /** 모달 내용 */
  children: ReactNode;
  /** 모달 하단 버튼 컴포넌트 그룹 */
  buttonGroup?: ReactNode;
  /** close 버튼 유무 */
  withCloseButton?: boolean;
  /** 모달 크기 */
  size?: string;
}

function Modal({
  opened,
  onClose,
  icon,
  title,
  children,
  buttonGroup,
  withCloseButton = false,
  size,
}: Props) {
  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={withCloseButton}
      size={size}
    >
      <Stack align="center" gap={0} pt={16}>
        {icon || <IconAlertTriangle />}
        <Text fw={700} fz={24} mt={16} mb={32}>
          {title}
        </Text>
        {children}
      </Stack>
      <Group justify="right" mt={36}>
        {buttonGroup}
      </Group>
    </MantineModal>
  );
}

export default Modal;
