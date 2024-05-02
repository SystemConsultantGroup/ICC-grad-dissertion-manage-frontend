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
  const modificationFlag =
    user?.type === "STUDENT"
      ? user?.department.modificationFlag && user.currentPhase !== "PRELIMINARY"
      : false;
  return (
    <MantineAppShell
      padding={40}
      navbar={{ width: 300, breakpoint: "sm" }}
      styles={{ main: { background: "var(--mantine-color-main-background)" } }}
      disabled={disabledAppShell}
    >
      <Navbar userType={user?.type} modificationFlag={modificationFlag} />
      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
}

export default AppShell;
