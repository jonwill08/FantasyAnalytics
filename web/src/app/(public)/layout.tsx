import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Insights for serious fantasy managers",
  description:
    "Discover curated player evaluations, matchup grades, and lineup intelligence to win every week.",
};

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return <SiteShell>{children}</SiteShell>;
}

