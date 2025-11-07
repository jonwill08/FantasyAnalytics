export const dynamic = "force-static";

export default function TermsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Terms of Service</h1>
        <p className="text-sm text-muted">Usage terms will be finalized alongside the subscriber beta.</p>
      </header>
      <div className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
        <div className="rounded-2xl border border-dashed border-border/50 bg-surface-subtle p-10 text-sm text-muted">
          Terms of service placeholder. Expect details around subscription tiers, acceptable use, and
          data ownership shortly.
        </div>
      </div>
    </div>
  );
}

