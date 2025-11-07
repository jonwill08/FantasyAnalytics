export const dynamic = "force-static";

const phases = [
  {
    title: "MVP",
    items: [
      "Player card redesign with usage grades",
      "Projection pipeline v1 with schedule adjustments",
      "Waiver watchlist and alerting",
    ],
  },
  {
    title: "Season Launch",
    items: [
      "Custom scoring imports",
      "Lineup optimizer with scenario simulation",
      "Mobile-friendly dashboards",
    ],
  },
  {
    title: "Premium Labs",
    items: [
      "Machine learning breakout detector",
      "Advanced opponent scouting reports",
      "Trade evaluator with historical comps",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Product Roadmap</h1>
        <p className="max-w-2xl text-sm text-muted">
          High-level milestones for the Fantasy Analytics platform. Feedback is welcomed as we iterate
          toward launch.
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-3">
        {phases.map((phase) => (
          <div key={phase.title} className="flex flex-col gap-3 rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">{phase.title}</h2>
            <ul className="space-y-2 text-sm text-muted/90">
              {phase.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

