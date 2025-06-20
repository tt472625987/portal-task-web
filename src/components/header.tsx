import { LucideKanban } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { homePath, taskPath } from "@/paths";

const Header = () => {
  return (
    <nav
      className="
            fixed left-0 right-0 top-0 z-20
            border-b bg-background/60 backdrop-blur
            w-full flex py-2.5 px-5 justify-between
          "
    >
      <div>
        <Link href={homePath} className={buttonVariants({ variant: "ghost" })}>
          <LucideKanban />
          <h1 className="text-lg font-semibold ml-1">TaskBounty</h1>
        </Link>
      </div>
      <div>
        <Link
          href={taskPath}
          className={buttonVariants({ variant: "default" })}
        >
          Tasks
        </Link>
      </div>
    </nav>
  );
};

export { Header };
