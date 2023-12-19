import { Avatar, Box, Group, Stack, Text, UnstyledButton } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

function Profile() {
  // Todo: Theme 적용, 유저정보 api 연결

  return (
    <Box
      style={{
        borderBottom: `1px solid gray`,
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
          <Stack gap={0} w="50%">
            <Text size="md" fw={500} truncate>
              김ㅇㅇ
            </Text>
            <Text c="dimmed" size="sm" truncate>
              asdfasdf@asdf.com
            </Text>
          </Stack>
          <IconLogout
            size={18}
            stroke={1}
            onClick={() => {
              // Todo: logout 추가
            }}
          />
        </Group>
      </UnstyledButton>
    </Box>
  );
}

export default Profile;
