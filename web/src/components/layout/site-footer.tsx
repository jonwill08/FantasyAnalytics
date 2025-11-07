import Link from "next/link";

import { secondaryNav } from "@/config/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <div className="max-w-md space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Fantasy Analytics</h2>
            <p className="text-sm text-muted">
              Evaluate players with confidence using advanced metrics, projections, and matchup
              intelligence built for competitive fantasy GMs.
            </p>
          </div>
          <div className="flex gap-8 text-sm text-muted">
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Product</p>
              <ul className="space-y-1">
                <li>
                  <Link className="transition hover:text-foreground" href="/players">
                    Player grades
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-foreground" href="/lineups">
                    Lineup builder
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-foreground" href="/matchups">
                    Matchup hub
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Company</p>
              <ul className="space-y-1">
                {secondaryNav.map((item) => (
                  <li key={item.href}>
                    <Link className="transition hover:text-foreground" href={item.href}>
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link className="transition hover:text-foreground" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-border/40 pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Fantasy Analytics. All rights reserved.</p>
          <div className="flex gap-4">
            <Link className="transition hover:text-foreground" href="/privacy">
              Privacy
            </Link>
            <Link className="transition hover:text-foreground" href="/terms">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

