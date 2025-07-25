import Link from "next/link";
import { cloneElement } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { closeClassName } from "../constants";
import { NavItem } from "../type";

type Props = {
  navItem: NavItem;
  isActive: boolean;
  isOpen: boolean;
};

const SidebarItem = (props: Props) => {
  const { navItem, isOpen, isActive } = props;

  return (
    <>
      {navItem?.separator && <Separator />}
      <Link
        href={navItem.href}
        className={cn(
          buttonVariants({ variant: "ghost", size: "lg" }),
          "group relative flex h-12 justify-start",
          isActive && "bg-muted font-bold hover:bg-muted"
        )}
      >
        {cloneElement(navItem.icon, {
          className: "h-5 w-5",
        })}

        <span
          className={cn(
            "absolute left-12 text-base duration-200",
            isOpen ? "md:block hidden" : "w-[78px]",
            !isOpen && closeClassName
          )}
        >
          {navItem.title}
        </span>
      </Link>
    </>
  );
};

export { SidebarItem };
