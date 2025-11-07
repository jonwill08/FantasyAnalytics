export const dynamic = "force-static";

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Privacy Policy</h1>
        <p className="text-sm text-muted">A formal policy will be published prior to public release.</p>
      </header>
      <div className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
        <div className="rounded-2xl border border-dashed border-border/50 bg-surface-subtle p-10 text-sm text-muted">
          We take data security seriously. This placeholder will be replaced with the finalized policy
          covering user data, retention, and third-party processors.
        </div>
      </div>
    </div>
  );
}

