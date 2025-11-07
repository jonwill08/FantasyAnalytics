export const dynamic = "force-static";

export default function LineupsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Lineup Builder</h1>
        <p className="max-w-2xl text-sm text-muted">
          Model optimal rosters with automated injury adjustments, bye-week planning, and scenario
          comparisons rooted in your scoring settings.
        </p>
      </header>
      <div className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm sm:p-8">
        <div className="rounded-2xl border border-dashed border-border/50 bg-surface-subtle p-10 text-center text-sm text-muted">
          Interactive lineup optimization, roster import, and streaming recommendations will live here.
        </div>
      </div>
    </div>
  );
}

