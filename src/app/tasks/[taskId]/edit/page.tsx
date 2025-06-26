import { notFound } from "next/navigation";

import { CardCompact } from "@/components/card-compact";
import { TaskUpsertForm } from "@/features/task/components/task-upsert-form";
import { getTask } from "@/features/task/queries/get-task";

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
    <div className="flex flex-col flex-1 justify-center items-center">
      <CardCompact
        title="Edit Task"
        description="Edit an existing ticket"
        className="w-full max-w-[420px] self-center animate-fade-in-from-top"
        content={<TaskUpsertForm task={task} />}
      />
    </div>
  );
};

export default Page;
