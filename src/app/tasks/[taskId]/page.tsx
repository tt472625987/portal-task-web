import { initialTasks } from "@/data";

const Page = ({ params }: { params: { taskId: string } }) => {
  const task = initialTasks.find((task) => task.id === params.taskId);

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
