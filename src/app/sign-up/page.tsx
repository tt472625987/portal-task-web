import { CardCompact } from "@/components/card-compact";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { signInPath } from "@/paths";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <CardCompact
        title="Sign Up"
        description="Create a new account"
        className="w-full max-w-[420px] self-center animate-fade-in-from-top"
        content={<SignUpForm />}
        footer={
          <Link href={signInPath} className="text-sm text-muted-foreground">
            Already have an account? Sign in
          </Link>
        }
      />
    </div>
  );
};

export default SignUpPage;
