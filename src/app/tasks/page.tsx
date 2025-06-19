import Link from "next/link";

import { initialTasks } from "@/data";
import { taskDetailPath } from "@/paths";

const TASK_ICON = {
  open: "🔴",
  done: "🟢",
  "in-progress": "🟡",
};

const Page = () => {
  return (
    <div>
      {initialTasks.map((task) => (
        <div key={task.id}>
          <Link href={taskDetailPath(task.id)}>
            <div className="flex items-center gap-2">
              <div>{TASK_ICON[task.status]}</div>
              <div>{task.title}</div>
            </div>
            <div className="text-sm text-muted-foreground">
              {task.description}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Page;
