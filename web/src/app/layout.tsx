import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/app/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fantasy-analytics.dev"),
  title: {
    default: "Fantasy Analytics",
    template: "%s | Fantasy Analytics",
  },
  description:
    "Fantasy football player evaluation platform with advanced metrics, projections, and lineup tools.",
  openGraph: {
    title: "Fantasy Analytics",
    description:
      "Evaluate fantasy football players with advanced grades, projections, and matchup insights.",
    url: "https://fantasy-analytics.dev",
    siteName: "Fantasy Analytics",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fantasy Analytics",
    description:
      "Evaluate fantasy football players with advanced grades, projections, and matchup insights.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-surface text-foreground antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
