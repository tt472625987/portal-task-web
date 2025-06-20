import Link from "next/link";

import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTasks } from "@/data";
import { TaskItem } from "@/features/task/components/task-item";
import { taskPath } from "@/paths";

type Props = {
  params: Promise<{ taskId: string }>;
};

const Page = async ({ params }: Props) => {
  const { taskId } = await params;

  const task = initialTasks.find((task) => task.id === taskId);

  if (!task) {
    return (
      <Placeholder
        label="Task not found"
        button={
          <Button asChild variant="outline">
            <Link href={taskPath}>Go To Tasks</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex justify-center animate-fade-in-from-top">
      <TaskItem task={task} isDetail />
    </div>
  );
};

export default Page;
