import { Image, AppShell, useMantineTheme } from "@mantine/core";
import Profile from "@/components/common/AppShell/_elements/Profile";
import NavbarList from "@/components/common/AppShell/_elements/NavbarList";
import { Role } from "@/api/_types/user";
import Link from "next/link";

interface Props {
  userType?: Role;
  modificationFlag?: boolean;
}

function Navbar({ userType, modificationFlag }: Props) {
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
      {userType && modificationFlag && (
        <NavbarList userType={userType} modificationFlag={modificationFlag} />
      )}
    </AppShell.Navbar>
  );
}

export default Navbar;
