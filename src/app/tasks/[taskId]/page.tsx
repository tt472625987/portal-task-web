import { initialTasks } from "@/data";

type Props = {
  params: Promise<{ taskId: string }>;
};

const Page = async ({ params }: Props) => {
  const { taskId } = await params;

  const task = initialTasks.find((task) => task.id === taskId);

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <div>
        <h1>{task?.title}</h1>
        <p>{task?.description}</p>
      </div>
    </div>
  );
};

export default Page;
