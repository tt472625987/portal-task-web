import { LucideBook, LucideLibrary } from "lucide-react";

import { homePath, taskPath } from "@/paths";

import { NavItem } from "./type";

export const NAV_ITEMS: NavItem[] = [
  {
    title: "All Tasks",
    href: homePath,
    icon: <LucideLibrary />,
  },
  {
    title: "My Tasks",
    href: taskPath,
    icon: <LucideBook />,
  },
];

export const closeClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100 ";
