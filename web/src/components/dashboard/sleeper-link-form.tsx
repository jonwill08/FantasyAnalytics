"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

type SleeperLinkFormProps = {
  onSuccess?: () => void;
  onLinkSuccess?: () => void; // Callback when account is successfully linked
  existingSleeperInfo?: { username?: string | null; sleeperId?: string } | null; // Existing linked account info
};

export function SleeperLinkForm({ onSuccess, onLinkSuccess, existingSleeperInfo }: SleeperLinkFormProps) {
  const { user } = useUser();
  const [sleeperUsername, setSleeperUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(!existingSleeperInfo); // Hide form if already linked

  // Update showForm when existingSleeperInfo changes
  useEffect(() => {
    if (existingSleeperInfo && !success) {
      setShowForm(false);
    }
  }, [existingSleeperInfo, success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !sleeperUsername.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/v1/sleeper/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          sleeperUsername: sleeperUsername.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const errorMessage = data.message || data.error || `Server error: ${response.status}`;
        throw new Error(errorMessage);
      }

      const result = await response.json();
      
      setSuccess(true);
      setSleeperUsername("");
      setShowForm(false); // Hide form after successful link
      
      // Notify that account is linked (so PlayersList can start checking)
      onLinkSuccess?.();
      
      // Trigger sync after linking (non-blocking)
      fetch("http://localhost:3001/v1/sleeper/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      })
        .then((syncResponse) => syncResponse.json())
        .then((syncData) => {
          if (syncData.error) {
            console.warn("Sync completed with warnings:", syncData);
          }
        })
        .catch((err) => {
          console.error("Failed to sync players:", err);
        });
      
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Show success message after linking
  if (success) {
    return (
      <div className="rounded-2xl border border-positive/30 bg-positive/10 p-6 text-center">
        <p className="text-sm font-medium text-positive">Sleeper account linked successfully!</p>
        <p className="mt-2 text-xs text-muted">Your players will be synced shortly.</p>
      </div>
    );
  }

  // Show existing account info if already linked
  if (existingSleeperInfo && !showForm) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-positive/30 bg-positive/10 p-6 text-center">
          <p className="text-sm font-medium text-positive">Sleeper account linked</p>
          <p className="mt-2 text-xs text-muted">
            Username: <span className="font-semibold">{existingSleeperInfo.username || "N/A"}</span>
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-surface-subtle"
        >
          Link Different Account
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="sleeper-username" className="mb-2 block text-sm font-medium text-foreground">
          Sleeper Username
        </label>
        <input
          id="sleeper-username"
          type="text"
          value={sleeperUsername}
          onChange={(e) => setSleeperUsername(e.target.value)}
          placeholder="Enter your Sleeper username"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          disabled={isLoading}
          required
        />
        <p className="mt-2 text-xs text-muted">
          Enter your Sleeper username (e.g., &quot;jonwill04&quot;). This is case-sensitive.
        </p>
      </div>
      {error && (
        <div className="rounded-xl border border-negative/30 bg-negative/10 px-4 py-2 text-sm text-negative">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={isLoading || !sleeperUsername.trim()}
        className="w-full rounded-full bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Linking...
          </span>
        ) : (
          "Link Sleeper Account"
        )}
      </button>
    </form>
  );
}

