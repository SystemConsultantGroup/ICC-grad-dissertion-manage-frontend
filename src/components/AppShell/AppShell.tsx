"use client";

import { AppShell as MantineAppShell } from "@mantine/core";
import Navbar from "@/components/AppShell/_elements/Navbar";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../AuthProvider";

interface Props {
  children: ReactNode;
}

function AppShell({ children }: Props) {
  const { userType } = useAuth();
  const pathname = usePathname();
  const disabledAppShell = userType === null || pathname === "/login";

  return (
    <MantineAppShell
      padding={40}
      navbar={{ width: 300, breakpoint: "sm" }}
      styles={{ main: { background: "#FCFCFE" } }}
      disabled={disabledAppShell}
    >
      <Navbar userType={userType} />
      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
}

export default AppShell;
