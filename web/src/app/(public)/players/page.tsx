export const dynamic = "force-static";

export default function PlayersPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Player Intelligence Hub</h1>
        <p className="max-w-2xl text-sm text-muted">
          Track form, usage, and matchup leverage in one unified view. Filter by position, custom
          tiers, and flag your watchlist for weekly alerts.
        </p>
      </header>
      <div className="grid gap-6 rounded-3xl border border-border/70 bg-surface p-6 shadow-sm sm:p-8">
        <div className="rounded-2xl border border-dashed border-border/50 bg-surface-subtle p-10 text-center text-sm text-muted">
          Player tables, comparison charts, and projection toggles will appear here once the data
          pipeline is connected.
        </div>
      </div>
    </div>
  );
}

