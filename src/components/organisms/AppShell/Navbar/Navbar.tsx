import { Box, Image, AppShell } from "@mantine/core";
import Profile from "@/components/organisms/AppShell/Profile/Profile";
import NavbarList from "@/components/organisms/AppShell/Navbar/NavbarList/NavbarList";

function Navbar() {
  return (
    <AppShell.Navbar>
      <AppShell.Section>
        <Box
          style={{
            borderBottom: `1px solid gray`,
            padding: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image src="/images/smallTitle.svg" alt="SKKU logo" fit="contain" w={200} h={46} />
        </Box>
      </AppShell.Section>
      <AppShell.Section>
        <Profile />
      </AppShell.Section>
      {/* Todo: 유저 정보 api 연결 */}
      <NavbarList userType={"ADMIN"} />
    </AppShell.Navbar>
  );
}

export default Navbar;
