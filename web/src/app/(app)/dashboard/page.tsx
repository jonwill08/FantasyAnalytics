import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/auth/sign-in");
  }
  const user = await currentUser();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm text-muted">Welcome back{user?.firstName ? `, ${user.firstName}` : ""}.</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border/70 bg-surface p-6 shadow-sm">
          <p className="text-sm text-muted">Your personalized analytics will appear here.</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-surface p-6 shadow-sm">
          <p className="text-sm text-muted">Link your league and configure scoring to unlock insights.</p>
        </div>
      </div>
    </div>
  );
}


