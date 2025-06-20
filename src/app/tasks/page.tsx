import { Heading } from "@/components/heading";
import { initialTasks } from "@/data";
import { TaskItem } from "@/features/task/components/task-item";

const Page = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="TasksPage" description="All your tasks at one place" />

      <div className="flex flex-1 flex-col items-center gap-y-4 animate-fade-in-from-top">
        {initialTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Page;
