export const homePath = "/";
export const taskPath = "/tasks";
export const taskDetailPath = (taskId: string) => `${taskPath}/${taskId}`;
export const taskEditPath = (taskId: string) => `${taskPath}/${taskId}/edit`;
