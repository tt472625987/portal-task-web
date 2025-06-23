import { notFound } from "next/navigation";

import { TaskItem } from "@/features/task/components/task-item";
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
    <div className="flex justify-center animate-fade-in-from-top">
      <TaskItem task={task} isDetail />
    </div>
  );
};

export default Page;
