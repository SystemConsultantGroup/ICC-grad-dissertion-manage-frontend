import { Metadata } from "next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "정보통신대학원 졸업논문시스템",
  // description: "졸업논문을 으으으으음",
};
