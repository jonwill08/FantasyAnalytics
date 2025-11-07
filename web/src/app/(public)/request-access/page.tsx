export const dynamic = "force-static";

export default function RequestAccessPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-3 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Request Early Access</h1>
        <p className="text-sm text-muted">
          We’re onboarding competitive leagues gradually to ensure the analytics pipeline scales with
          the quality bar we expect. Drop your details and we’ll reach out within 48 hours.
        </p>
      </header>
      <div className="rounded-3xl border border-border/70 bg-surface p-8 shadow-sm">
        <div className="rounded-2xl border border-dashed border-border/50 bg-surface-subtle p-10 text-center text-sm text-muted">
          Access form and onboarding wizard will be implemented once backend services are connected.
        </div>
      </div>
    </div>
  );
}

