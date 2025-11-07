import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "App",
};

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return <SiteShell>{children}</SiteShell>;
}


