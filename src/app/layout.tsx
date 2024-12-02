import { Metadata } from "next";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@/theme/global.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { AppShell } from "@/components/common/AppShell";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "@/components/common/AuthProvider/AuthProvider";
import { ReactNode } from "react";
import { SWRProvider } from "@/api/SWR/SWRProvider";
import { AppTheme, resolver } from "@/theme";

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <SWRProvider>
          <MantineProvider theme={AppTheme} cssVariablesResolver={resolver}>
            <AuthProvider>
              <Notifications />
              <AppShell>{children}</AppShell>
              <footer style={{ textAlign: "center", fontSize: "12px" }}>
                Copyright © 2024 성균관대학교 시스템컨설턴트그룹 All rights reserved.
              </footer>
            </AuthProvider>
          </MantineProvider>
        </SWRProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "정보통신/소프트웨어융합대학 일반대학원 학위논문심사시스템",
  // description: "졸업논문을 으으으으음",
};
