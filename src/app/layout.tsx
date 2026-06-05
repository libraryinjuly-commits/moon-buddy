import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "문 버디",
  description: "생리 주기를 기록하고 기분을 남기며 달 친구를 키워보세요.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#7c3aed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="h-full overflow-hidden bg-gradient-to-br from-slate-300 via-slate-200 to-violet-200/70 font-sans text-violet-950">
        <div className="flex h-dvh w-full items-stretch justify-center overflow-hidden md:py-3">
          {children}
        </div>
      </body>
    </html>
  );
}
