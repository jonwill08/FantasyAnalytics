"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { primaryNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

import { Logo } from "../ui/logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Fantasy Analytics home">
            <Logo className="h-10 w-auto" />
            <span className="hidden text-lg font-semibold tracking-tight text-foreground sm:inline">Fantasy Analytics</span>
          </Link>
          <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-surface-subtle px-1 py-1 sm:flex">
            {primaryNav.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-foreground text-surface"
                      : "text-muted hover:bg-surface hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <SignedOut>
            <Link
              href="/auth/sign-in"
              className="hidden rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/auth/sign-up"
              className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:brightness-110 sm:inline-flex"
            >
              Create account
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-border p-2 text-muted transition-colors hover:text-foreground sm:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={cn(
          "border-t border-border/60 bg-surface-subtle px-4 py-4 sm:hidden",
          isMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col gap-2">
          {primaryNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-base font-medium transition-colors",
                  isActive ? "bg-foreground text-surface" : "text-muted hover:bg-surface"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="mt-4 flex flex-col gap-2">
            <SignedOut>
              <Link
                href="/auth/sign-in"
                className="rounded-full border border-border px-3 py-2 text-center text-sm font-medium text-foreground transition-colors hover:border-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/auth/sign-up"
                className="rounded-full bg-accent px-3 py-2 text-center text-sm font-semibold text-accent-foreground transition hover:brightness-110"
                onClick={() => setIsMenuOpen(false)}
              >
                Create account
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="rounded-xl border border-border/60 bg-surface px-3 py-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>
    </header>
  );
}

