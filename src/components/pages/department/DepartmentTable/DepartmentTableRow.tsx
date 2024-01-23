import { Box, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertTriangle } from "@tabler/icons-react";
import { ClientAxios } from "@/api/ClientAxios";
import { API_ROUTES } from "@/api/apiRoute";
import { showNotificationSuccess } from "@/components/common/Notifications";
import { KeyedMutator } from "swr";
import { DepartmentsResponse } from "@/api/_types/department";
import classes from "./DepartmentTableRow.module.css";

interface Props {
  id: number;
  name: string;
  userCount: number;
  mutate: KeyedMutator<DepartmentsResponse>;
}

function DepartmentTableRow({ id, name, userCount, mutate }: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = async () => {
    try {
      await ClientAxios.delete(API_ROUTES.department.delete(id));
      showNotificationSuccess({ message: "학과 삭제 완료" });
      mutate();
      close();
    } catch (error) {
      /* empty */
    }
  };

  return (
    <Box className={classes.wrapper}>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered radius="lg">
        <Stack gap={36} align="center" p="lg">
          <IconAlertTriangle color="red" />
          <Group>
            <Text fw={600}>{name}</Text>를 삭제하시겠습니까?
          </Group>
          <Group>
            <Button key="cancel" variant="outline" onClick={close}>
              취소
            </Button>
            <Button key="delete" color="red" onClick={handleDelete}>
              학과 삭제
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Group justify="space-between">
        <Stack gap={8}>
          <Text className={classes.deptNameText}>{name}</Text>
          <Text className={classes.userCountText}>{userCount}명 소속</Text>
        </Stack>
        <Button className={classes.deleteButton} onClick={open}>
          학과 삭제
        </Button>
      </Group>
    </Box>
  );
}

export default DepartmentTableRow;
