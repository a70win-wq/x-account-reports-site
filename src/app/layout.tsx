import type { Metadata } from "next";
import { IBM_Plex_Mono, Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const sans = Noto_Sans_TC({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

const serif = Noto_Serif_TC({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "X帳號研究｜每日自找全析",
    template: "%s｜X帳號研究",
  },
  description: "每日自找 X 帳號全析 · 只讀公開資料",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-cream">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
