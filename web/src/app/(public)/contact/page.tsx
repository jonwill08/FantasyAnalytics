export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Contact the Team</h1>
        <p className="text-sm text-muted">
          Partnership inquiries, beta access, or feedback? We’d love to hear from you.
        </p>
      </header>
      <div className="rounded-3xl border border-border/70 bg-surface p-6 shadow-sm">
        <div className="rounded-2xl border border-dashed border-border/50 bg-surface-subtle p-10 text-center text-sm text-muted">
          Contact form integration is coming soon. Email support@fantasy-analytics.dev in the meantime.
        </div>
      </div>
    </div>
  );
}

