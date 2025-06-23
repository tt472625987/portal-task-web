import { TaskItem } from "@/features/task/components/task-item";
import { getTasks } from "@/features/task/queries/get-tasks";

const TaskList = async () => {
  const tasks = await getTasks();

  return (
    <div className="flex flex-1 flex-col items-center gap-y-4 animate-fade-in-from-top">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export { TaskList };
