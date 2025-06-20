import { LucideCircleCheck, LucideFile, LucidePencil } from "lucide-react";
import Link from "next/link";

import { Heading } from "@/components/heading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { initialTasks } from "@/data";
import { taskDetailPath } from "@/paths";

const TASK_ICON = {
  open: <LucideFile />,
  done: <LucideCircleCheck />,
  "in-progress": <LucidePencil />,
};

const Page = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="TasksPage" description="All your tasks at one place" />

      <div className="flex flex-1 flex-col items-center gap-y-4 animate-fade-in-from-top">
        {initialTasks.map((task) => (
          <Card key={task.id} className="w-full max-w-[420px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <span>{TASK_ICON[task.status]}</span>
                <span className="truncate">{task.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="line-clamp-3 whitespace-break-spaces">
                {task.description}
              </span>
            </CardContent>
            <CardFooter>
              <Link
                href={taskDetailPath(task.id)}
                className="text-sm underline"
              >
                View
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
