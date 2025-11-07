import { SignUp } from "@clerk/nextjs";

export const dynamic = "force-static";

export default function SignUpPage() {
  return (
    <div className="mx-auto max-w-md py-10">
      <SignUp routing="path" path="/auth/sign-up" />
    </div>
  );
}