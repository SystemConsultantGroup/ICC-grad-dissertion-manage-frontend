import { useAuth } from "@/components/common/AuthProvider";
import { Avatar, Box, Group, Stack, Text, UnstyledButton, useMantineTheme } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

function Profile() {
  // Todo:  유저정보 api 연결
  const { user, logout } = useAuth();
  const theme = useMantineTheme();

  return (
    <Box
      style={{
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
      }}
    >
      <UnstyledButton
        style={{
          display: "block",
          width: "100%",
          padding: "20px",
          color: "black",
        }}
      >
        <Group wrap="nowrap">
          <Avatar src="" radius="xl" size={60} />
          <Stack gap={6} w="50%">
            <Text size="md" fw={500} truncate>
              {user?.name}
            </Text>
            <Text c="dimmed" size="sm" truncate>
              {user?.loginId}
            </Text>
          </Stack>
          <IconLogout
            size={18}
            stroke={1}
            onClick={() => {
              logout && logout();
            }}
          />
        </Group>
      </UnstyledButton>
    </Box>
  );
}

export default Profile;
