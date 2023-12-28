"use client";

import { AppShell as MantineAppShell } from "@mantine/core";
import Navbar from "@/components/common/AppShell/_elements/Navbar";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../AuthProvider";

interface Props {
  children: ReactNode;
}

function AppShell({ children }: Props) {
  const { user } = useAuth();
  const pathname = usePathname();
  const disabledAppShell = user?.type === null || pathname === "/login";

  return (
    <MantineAppShell
      padding={40}
      navbar={{ width: 300, breakpoint: "sm" }}
      styles={{ main: { background: "var(--color-main)" } }}
      disabled={disabledAppShell}
    >
      <Navbar userType={user?.type} />
      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
}

export default AppShell;
