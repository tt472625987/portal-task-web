import { CardCompact } from "@/components/card-compact";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { passwordForgotPath, signInPath } from "@/paths";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <CardCompact
        title="Sign In"
        description="Sign In to your account"
        className="w-full max-w-[420px] self-center animate-fade-in-from-top"
        content={<SignInForm />}
        footer={
          <div className="flex flex-1 items-center justify-between">
            <Link href={signInPath} className="text-sm text-muted-foreground">
              No account yet?
            </Link>
            <Link
              href={passwordForgotPath}
              className="text-sm text-muted-foreground"
            >
              Forgot Password?
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default SignInPage;
