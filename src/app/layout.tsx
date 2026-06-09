import type { Metadata, Viewport } from "next";
import { DM_Sans, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "문 버디",
  description: "감정과 함께 자라는 나만의 동반자, 문 버디.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#709BBF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden bg-[#FDFCF5] font-sans text-[#5C5470]">
        <div className="flex h-dvh w-full items-stretch justify-center overflow-hidden md:py-3">
          {children}
        </div>
      </body>
    </html>
  );
}
