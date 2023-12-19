"use client";

import { AppShell as MantineAppShell } from "@mantine/core";
import Navbar from "@/components/AppShell/_elements/Navbar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function AppShell({ children }: Props) {
  return (
    <MantineAppShell
      padding={40}
      navbar={{ width: 300, breakpoint: "sm" }}
      styles={{ main: { background: "#FCFCFE" } }}
    >
      <Navbar />
      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
}

export default AppShell;
