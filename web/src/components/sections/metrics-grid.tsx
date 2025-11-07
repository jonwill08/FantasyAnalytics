const metrics = [
  {
    label: "Player grades",
    value: "450+",
    description: "Composite scores updated every snap with film, efficiency, and volume weighting.",
  },
  {
    label: "Matchup signals",
    value: "32",
    description: "Defense-vs-position heatmaps with trench ratings and game environment variables.",
  },
  {
    label: "Projection scenarios",
    value: "120K",
    description: "Monte Carlo simulations each week to surface range-of-outcome tiers and volatility.",
  },
];

export function MetricsGrid() {
  return (
    <section className="rounded-3xl border border-border/70 bg-surface p-8 shadow-sm sm:p-10">
      <div className="grid gap-8 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-3">
            <p className="text-3xl font-semibold text-foreground sm:text-4xl">{metric.value}</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted">
              {metric.label}
            </p>
            <p className="text-sm text-muted/90">{metric.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

