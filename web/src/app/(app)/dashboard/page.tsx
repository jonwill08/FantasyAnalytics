"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SleeperLinkForm } from "@/components/dashboard/sleeper-link-form";
import { PlayersList } from "@/components/dashboard/players-list";

export default function DashboardPage() {
  const { user } = useUser();
  const [sleeperAccountLinked, setSleeperAccountLinked] = useState(false);

  // Check if Sleeper account is already linked on mount
  const { data: existingSleeperInfo } = useQuery({
    queryKey: ["sleeper-info-check", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const response = await fetch(`http://localhost:3001/v1/sleeper/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      if (!response.ok) return null;
      return response.json();
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Update state when we find existing Sleeper account
  useEffect(() => {
    if (existingSleeperInfo) {
      setSleeperAccountLinked(true);
    }
  }, [existingSleeperInfo]);

  if (!user) {
    return null; // Will redirect via middleware
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm text-muted">Welcome back{user?.firstName ? `, ${user.firstName}` : ""}.</p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/70 bg-surface p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Link Sleeper League</h2>
          <p className="mb-6 text-sm text-muted">
            Connect your Sleeper account to sync your roster and unlock personalized insights.
          </p>
          <SleeperLinkForm 
            existingSleeperInfo={existingSleeperInfo}
            onLinkSuccess={() => setSleeperAccountLinked(true)} 
          />
        </div>
        <div className="rounded-2xl border border-border/70 bg-surface p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Your Players</h2>
          <PlayersList sleeperAccountLinked={sleeperAccountLinked} />
        </div>
      </div>
      <div className="rounded-2xl border border-border/70 bg-surface p-6 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold text-foreground">Analytics</h2>
        <p className="text-sm text-muted">Your personalized analytics will appear here once players are synced.</p>
      </div>
    </div>
  );
}


