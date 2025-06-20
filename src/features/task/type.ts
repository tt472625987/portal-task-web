export type TaskStatus = "DONE" | "OPEN" | "IN_PROGRESS";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
};
