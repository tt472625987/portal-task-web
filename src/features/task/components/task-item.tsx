import clsx from "clsx";
import {
  LucidePencil,
  LucideSquareArrowOutUpRight,
  LucideTrash,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TASK_ICON } from "@/features/task/constants";
import { taskDetailPath, taskEditPath } from "@/paths";

import { deleteTask } from "../actions/delete-task";
import { getTask } from "../queries/get-task";
import { getTasks } from "../queries/get-tasks";

type Props = {
  task:
    | Awaited<ReturnType<typeof getTasks>>[number]
    | Awaited<ReturnType<typeof getTask>>;
  isDetail?: boolean;
};

const TaskItem = ({ task, isDetail = false }: Props) => {
  if (!task) return null;

  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={taskDetailPath(task.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={taskEditPath(task.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  );

  const deleteButton = (
    <form action={deleteTask.bind(null, task.id)}>
      <Button variant="outline" size="icon">
        <LucideTrash className="h-4 w-4" />
      </Button>
    </form>
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
      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {deleteButton}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
};

export { TaskItem };
