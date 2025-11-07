export const dynamic = "force-static";

export default function ChangelogPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Changelog</h1>
        <p className="text-sm text-muted">Release notes will be published here as features roll out.</p>
      </header>
      <div className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
        <div className="rounded-2xl border border-dashed border-border/50 bg-surface-subtle p-10 text-center text-sm text-muted">
          No updates yet — the product foundation is currently under active development.
        </div>
      </div>
    </div>
  );
}

