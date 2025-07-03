import { LucideKanban } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { homePath, signInPath, signUpPath, taskPath } from "@/paths";

import { ThemeSwitcher } from "./theme/theme-switcher";

const Header = () => {
  const navItems = (
    <>
      <Link href={taskPath} className={buttonVariants({ variant: "default" })}>
        Tasks
      </Link>
      <Link
        href={signUpPath}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign In
      </Link>
    </>
  );
  return (
    <nav
      className="
            fixed left-0 right-0 top-0 z-20
            border-b bg-background/60 backdrop-blur
            w-full flex py-2.5 px-5 justify-between
          "
    >
      <div className="flex align-items gap-x-2">
        <Link href={homePath} className={buttonVariants({ variant: "ghost" })}>
          <LucideKanban />
          <h1 className="text-lg font-semibold ml-1">TaskBounty</h1>
        </Link>
      </div>
      <div className="flex align-items gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

export { Header };
