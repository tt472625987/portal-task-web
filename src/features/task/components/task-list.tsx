import { TaskItem } from "@/features/task/components/task-item";
import { getTasks } from "@/features/task/queries/get-tasks";

type Props = {
  userId?: string;
};

const TaskList = async (props: Props) => {
  const { userId } = props;

  const tasks = await getTasks(userId);

  return (
    <div className="flex flex-1 flex-col items-center gap-y-4 animate-fade-in-from-top">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export { TaskList };
