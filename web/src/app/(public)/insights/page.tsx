export const dynamic = "force-static";

export default function InsightsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Insights & Stories</h1>
        <p className="max-w-2xl text-sm text-muted">
          Deep dives into usage trends, breakout signals, and waiver stashes backed by data. Updated
          weekly throughout the season.
        </p>
      </header>
      <div className="grid gap-6 rounded-3xl border border-border/70 bg-surface p-6 shadow-sm sm:p-8">
        <div className="rounded-2xl border border-dashed border-border/50 bg-surface-subtle p-10 text-center text-sm text-muted">
          Narrative analysis, video breakdowns, and interactive charts will appear here as content is
          produced.
        </div>
      </div>
    </div>
  );
}

