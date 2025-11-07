export const dynamic = "force-static";

export default function MatchupsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Matchup Hub</h1>
        <p className="max-w-2xl text-sm text-muted">
          Evaluate every weekly matchup with trench battles, coverage archetypes, and pace projections
          to identify exploitable game environments.
        </p>
      </header>
      <div className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm sm:p-8">
        <div className="rounded-2xl border border-dashed border-border/50 bg-surface-subtle p-10 text-center text-sm text-muted">
          Defensive matchup metrics, weather alerts, and game stack visualizations will populate this
          space once connected to the data layer.
        </div>
      </div>
    </div>
  );
}

