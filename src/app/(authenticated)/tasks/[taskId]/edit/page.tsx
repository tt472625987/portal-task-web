import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumb";
import { CardCompact } from "@/components/card-compact";
import { Separator } from "@/components/ui/separator";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { TaskUpsertForm } from "@/features/task/components/task-upsert-form";
import { getTask } from "@/features/task/queries/get-task";
import { taskDetailPath, taskPath } from "@/paths";

type Props = {
  params: Promise<{ taskId: string }>;
};

const Page = async ({ params }: Props) => {
  const { taskId } = await params;

  const { user } = await getAuth();
  const task = await getTask(taskId);

  const isTaskOwner = isOwner(user, task);
  const isTaskFound = !!task;

  if (!isTaskFound || !isTaskOwner) {
    return notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tasks", href: taskPath },
          { title: task.title, href: taskDetailPath(task.id) },
          { title: "Edit" },
        ]}
      />

      <Separator />

      <div className="flex flex-col flex-1 justify-center items-center">
        <CardCompact
          title="Edit Task"
          description="Edit an existing ticket"
          className="w-full max-w-[420px] self-center animate-fade-in-from-top"
          content={<TaskUpsertForm task={task} />}
        />
      </div>
    </div>
  );
};

export default Page;
