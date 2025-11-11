import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { InsightsPreview } from "@/components/sections/insights-preview";
import { MetricsGrid } from "@/components/sections/metrics-grid";
import { QuickStart } from "@/components/sections/quick-start";

export default async function MarketingHomePage() {
  const { userId } = await auth();
  
  // If user is signed in, redirect to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-[var(--gradient-start)] via-[var(--gradient-end)] to-[var(--surface-subtle)] px-6 py-16 text-surface shadow-sm sm:px-12 sm:py-20">
        <div className="absolute inset-0" aria-hidden>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_60%)]" />
        </div>
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              Engineered for fantasy football grinders
            </span>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Evaluate every player with actionable analytics.
            </h1>
            <p className="text-pretty text-base text-white/85 sm:text-lg">
              Bring together efficiency metrics, utilization signals, and matchup context to spot the
              breakout before your league mates do.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/sign-in"
                className="rounded-full bg-surface px-5 py-3 text-center text-sm font-semibold text-foreground transition hover:brightness-110"
              >
                Sign in
              </Link>
              <Link
                href="/insights"
                className="rounded-full bg-white/20 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/30"
              >
                Explore data stories
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm rounded-2xl border border-white/30 bg-white/10 p-6 backdrop-blur lg:max-w-md">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
              Player Outlook Preview
            </h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-white/15 px-4 py-3">
                <div>
                  <p className="font-semibold">Malik Nabers</p>
                  <p className="text-xs text-white/80">vs. DAL · Week 1</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wide text-white/70">Stock</p>
                  <p className="text-lg font-semibold text-emerald-200">▲ 8.2%</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/15 px-4 py-3">
                <div>
                  <p className="font-semibold">Bijan Robinson</p>
                  <p className="text-xs text-white/80">@ PHI · Week 1</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wide text-white/70">Grade</p>
                  <p className="text-lg font-semibold text-white">93.4</p>
                </div>
              </div>
              <div className="rounded-xl bg-white/10 px-4 py-3 text-xs text-white/90">
                Early-week read: Both players draw top-10 pace games. Atlanta projects for +11% rush EPA.
                Expect heavy usage spikes and slate-breaking upside.
              </div>
            </div>
          </div>
        </div>
      </section>

      <MetricsGrid />
      <InsightsPreview />
      <QuickStart />
    </div>
  );
}

