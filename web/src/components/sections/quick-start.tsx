const steps = [
  {
    title: "Connect your league",
    description: "Sync scoring settings and rosters from Sleeper, ESPN, or Yahoo in seconds.",
  },
  {
    title: "Calibrate projections",
    description: "Adjust baselines, injury minutes, and ceiling multipliers for your league tendencies.",
  },
  {
    title: "Dominate waivers",
    description: "Surface priority targets with trend scores, fab guidance, and roster fit analysis.",
  },
];

export function QuickStart() {
  return (
    <section className="rounded-3xl border border-border/70 bg-surface p-8 shadow-sm sm:p-10">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">Onboard in under 5 minutes</h2>
          <p className="text-sm text-muted">
            Built with clarity-first workflows so analysts and casual players alike can unlock insights
            without needing spreadsheets.
          </p>
        </div>
        <div className="grid flex-1 gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-surface-subtle p-5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                {index + 1}
              </span>
              <p className="text-base font-semibold text-foreground">{step.title}</p>
              <p className="text-sm text-muted/90">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

