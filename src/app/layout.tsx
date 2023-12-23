import { Metadata } from "next";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { AppShell } from "@/components/AppShell";
import { Notifications } from "@mantine/notifications";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications />
          <AppShell>{children}</AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}


export const metadata: Metadata = {
  title: "정보통신대학원 졸업논문시스템",
  // description: "졸업논문을 으으으으음",
};
