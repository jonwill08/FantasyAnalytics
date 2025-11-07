export const dynamic = "force-static";
import { SignIn } from "@clerk/nextjs";
export default function SignInPage() {
  return (
    <div className="mx-auto max-w-md py-10">
      <SignIn routing="path" path="/auth/sign-in" />
    </div>
  );
}

