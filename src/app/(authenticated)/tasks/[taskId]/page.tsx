import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { TaskItem } from "@/features/task/components/task-item";
import { getTask } from "@/features/task/queries/get-task";
import { taskPath } from "@/paths";

type Props = {
  params: Promise<{ taskId: string }>;
};

const Page = async ({ params }: Props) => {
  const { taskId } = await params;

  const task = await getTask(taskId);

  if (!task) {
    return notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tasks", href: taskPath },
          { title: task.title },
        ]}
      />

      <Separator />

      <div className="flex justify-center animate-fade-in-from-top">
        <TaskItem task={task} isDetail />
      </div>
    </div>
  );
};

export default Page;
