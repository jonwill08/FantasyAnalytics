"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";

type ProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const hasValidClerkKey = typeof publishableKey === "string" && publishableKey.startsWith("pk_");

  useEffect(() => {
    if (!hasValidClerkKey && process.env.NODE_ENV !== "production") {
      console.warn(
        "Clerk publishable key is not configured. Authentication components will render without Clerk context."
      );
    }
  }, [hasValidClerkKey]);

  const content = (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );

  if (!hasValidClerkKey) {
    return content;
  }

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#2563eb",
          colorBackground: "#ffffff",
          colorText: "#0f172a",
        },
      }}
      publishableKey={publishableKey}
      signInUrl="/auth/sign-in"
      signUpUrl="/auth/sign-up"
      afterSignOutUrl="/"
    >
      {content}
    </ClerkProvider>
  );
}

