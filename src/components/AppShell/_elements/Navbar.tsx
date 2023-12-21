import { Box, Image, AppShell, useMantineTheme } from "@mantine/core";
import Profile from "@/components/AppShell/_elements/Profile";
import NavbarList from "@/components/AppShell/_elements/NavbarList";

function Navbar() {
  const theme = useMantineTheme();

  return (
    <AppShell.Navbar>
      <AppShell.Section>
        <Box
          style={{
            borderBottom: `1px solid ${theme.colors.gray[2]}`,
            padding: "20px",
            display: "flex",
            justifyContent: "center",
          }}
          component="a"
          href="/"
        >
          <Image src="/images/smallTitle.svg" alt="SKKU logo" fit="contain" w={200} h={46} />
        </Box>
      </AppShell.Section>
      <AppShell.Section>
        <Profile />
      </AppShell.Section>
      {/* Todo: 유저 정보 api 연결 */}
      <NavbarList userType="ADMIN" />
    </AppShell.Navbar>
  );
}

export default Navbar;
