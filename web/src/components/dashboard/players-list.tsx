"use client";

import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

type Player = {
  id: string;
  player: {
    id: string;
    fullName: string;
    position: string;
    team: {
      name: string;
      abbreviation: string | null;
    } | null;
  };
};

type PlayersListProps = {
  sleeperAccountLinked?: boolean;
};

export function PlayersList({ sleeperAccountLinked = false }: PlayersListProps) {
  const { user } = useUser();

  // Only check Sleeper account status if we're told it might be linked
  // This prevents unnecessary API calls until user submits username
  const { data: sleeperInfo, isLoading: isLoadingInfo } = useQuery({
    queryKey: ["sleeper-info", user?.id],
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
    enabled: !!user?.id && sleeperAccountLinked, // Only check if we think account might be linked
  });

  // Only fetch players if Sleeper account is linked
  const { data: players, isLoading: isLoadingPlayers, error } = useQuery<Player[]>({
    queryKey: ["user-players", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const response = await fetch(`http://localhost:3001/v1/sleeper/players`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      if (!response.ok) throw new Error("Failed to fetch players");
      return response.json();
    },
    enabled: !!user?.id && !!sleeperInfo, // Only fetch if account is confirmed linked
  });

  const isLoading = isLoadingInfo || isLoadingPlayers;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-negative/30 bg-negative/10 px-4 py-3 text-sm text-negative">
        Failed to load players. Please try again.
      </div>
    );
  }

  // If Sleeper account is not linked, show message
  // Don't show loading if we haven't checked yet (sleeperAccountLinked is false)
  if (!sleeperAccountLinked || (!isLoading && !sleeperInfo)) {
    return (
      <div className="rounded-xl border border-border/50 bg-surface-subtle p-6 text-center text-sm text-muted">
        Link your Sleeper account to sync your roster and view your players.
      </div>
    );
  }

  // If account is linked but no players found
  if (!isLoading && sleeperInfo && (!players || players.length === 0)) {
    return (
      <div className="rounded-xl border border-border/50 bg-surface-subtle p-6 text-center text-sm text-muted">
        No players found. Sync your Sleeper account to load your roster.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Your Players ({players.length})</h3>
      <div className="space-y-2">
        {players.map((userPlayer) => {
          const { player } = userPlayer;
          return (
            <div
              key={userPlayer.id}
              className="flex items-center justify-between rounded-xl border border-border/60 bg-surface px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                  {player.position}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{player.fullName}</p>
                  {player.team && (
                    <p className="text-xs text-muted">
                      {player.team.abbreviation || player.team.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

