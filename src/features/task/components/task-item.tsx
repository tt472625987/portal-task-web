import { Prisma } from "@prisma/client";
import clsx from "clsx";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { TASK_ICON } from "@/features/task/constants";
import { taskDetailPath, taskEditPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";

import { TaskMoreMenu } from "./task-more-menu";

type Props = {
  task: Prisma.TaskGetPayload<{
    include: { user: { select: { username: true } } };
  }>;
  isDetail?: boolean;
};

const TaskItem = async (props: Props) => {
  const { task, isDetail = false } = props;
  if (!task) return null;

  const { user } = await getAuth();
  const isTaskOwner = isOwner(user, task);

  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={taskDetailPath(task.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  const editButton = isTaskOwner ? (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={taskEditPath(task.id)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  ) : null;

  const moreMenu = isTaskOwner ? (
    <TaskMoreMenu
      task={task}
      trigger={
        <Button variant="outline" size="icon">
          <LucideMoreVertical className="h-4 w-4" />
        </Button>
      }
    />
  ) : null;

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
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {task.deadline} by {task.user.username}
          </p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(task.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {moreMenu}
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
