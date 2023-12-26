import { Image, AppShell, useMantineTheme } from "@mantine/core";
import Profile from "@/components/common/AppShell/_elements/Profile";
import NavbarList from "@/components/common/AppShell/_elements/NavbarList";
import { Role } from "@/api/_types/common";
import Link from "next/link";

interface Props {
  userType: Role | null;
}

function Navbar({ userType }: Props) {
  const theme = useMantineTheme();

  return (
    <AppShell.Navbar>
      <AppShell.Section>
        <Link
          style={{
            borderBottom: `1px solid ${theme.colors.gray[2]}`,
            padding: "20px",
            display: "flex",
            justifyContent: "center",
          }}
          href="/"
        >
          <Image src="/images/smallTitle.svg" alt="SKKU logo" fit="contain" w={200} h={46} />
        </Link>
      </AppShell.Section>
      <AppShell.Section>
        <Profile />
      </AppShell.Section>
      {userType && <NavbarList userType={userType} />}
    </AppShell.Navbar>
  );
}

export default Navbar;
