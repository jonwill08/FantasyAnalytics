"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const projectionData = [
  { week: "W1", ceiling: 24.8, median: 18.4, floor: 11.1 },
  { week: "W2", ceiling: 26.2, median: 19.7, floor: 12.9 },
  { week: "W3", ceiling: 23.5, median: 17.3, floor: 9.8 },
  { week: "W4", ceiling: 27.9, median: 20.8, floor: 13.4 },
  { week: "W5", ceiling: 28.6, median: 21.2, floor: 14.1 },
];

export function InsightsPreview() {
  return (
    <section className="grid gap-8 rounded-3xl border border-border/70 bg-surface p-8 shadow-sm md:grid-cols-[1.1fr_1fr]">
      <div className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
          Featured insight
        </span>
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground">
          Weekly outlooks that translate complex data into clear start/sit calls.
        </h2>
        <p className="text-pretty text-sm text-muted">
          Every player card blends usage, matchup leverage, and market movement to produce confidence
          tiers. Understand the why behind each recommendation instead of trusting a single point
          projection.
        </p>
        <ul className="space-y-3 text-sm text-muted/90">
          <li>• Usage delta vs. league average over the last three weeks</li>
          <li>• Matchup leverage factoring pressure rate, coverage tendencies, and pace</li>
          <li>• Market signal drift from expert consensus, ADP, and betting splits</li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-surface-subtle p-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted uppercase tracking-wide">Trendline example</p>
          <h3 className="text-lg font-semibold text-foreground">Adaptive projection bands</h3>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projectionData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCeiling" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--gradient-start)" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="var(--gradient-start)" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorFloor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148, 163, 184, 0.25)" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="week" stroke="rgba(148,163,184,0.8)" tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(148,163,184,0.8)" tickFormatter={(value) => `${value}`}
                tickLine={false} axisLine={false} width={32}
              />
              <Tooltip
                cursor={{ stroke: "rgba(148,163,184,0.4)", strokeWidth: 1 }}
                contentStyle={{
                  background: "var(--surface)",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(148, 163, 184, 0.4)",
                  color: "var(--foreground)",
                }}
                formatter={(value: number, name) => [
                  `${value.toFixed(1)} pts`,
                  name === "ceiling" ? "Ceiling" : name === "median" ? "Median" : "Floor",
                ]}
              />
              <Area
                type="monotone"
                dataKey="ceiling"
                stroke="var(--gradient-start)"
                fillOpacity={1}
                fill="url(#colorCeiling)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="median"
                stroke="#facc15"
                fillOpacity={0}
                strokeWidth={2}
                strokeDasharray="6 3"
              />
              <Area
                type="monotone"
                dataKey="floor"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorFloor)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted">
          Sample data for illustration. Live app will connect to the weekly projection pipeline and
          historical game logs.
        </p>
      </div>
    </section>
  );
}

