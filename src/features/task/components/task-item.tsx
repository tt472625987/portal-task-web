import clsx from "clsx";
import { LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TASK_ICON } from "@/features/task/constants";
import { Task } from "@/features/task/type";
import { taskDetailPath } from "@/paths";

type Props = {
  task: Task;
  isDetail?: boolean;
};

const TaskItem = ({ task, isDetail = false }: Props) => {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link href={taskDetailPath(task.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  return (
    <div
      className={clsx("w-full flex gap-x-1", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <span>{TASK_ICON[task.status]}</span>
            <span className="truncate">{task.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx("whitespace-break-spaces text-sm", {
              "line-clamp-3": !isDetail,
            })}
          >
            {task.description}
          </span>
        </CardContent>
      </Card>
      {!isDetail && <div className="flex flex-col gap-y-1">{detailButton}</div>}
    </div>
  );
};

export { TaskItem };
