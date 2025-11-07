"use client";

import { SignedIn, SignedOut, UserProfile } from "@clerk/nextjs";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Your Account</h1>
        <p className="text-sm text-muted">Manage your profile, security, and sessions.</p>
      </header>
      <SignedIn>
        <div className="rounded-2xl border border-border/70 bg-surface p-4 shadow-sm">
          <UserProfile routing="path" path="/profile" />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="rounded-2xl border border-border/70 bg-surface p-10 text-center shadow-sm">
          <p className="text-sm text-muted">You need to sign in to view your profile.</p>
          <div className="mt-4 inline-flex gap-3">
            <Link href="/auth/sign-in" className="rounded-full border border-border px-4 py-2 text-sm">Sign in</Link>
            <Link href="/auth/sign-up" className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">Create account</Link>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}


