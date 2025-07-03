export const homePath = "/";
export const taskPath = "/tasks";
export const taskDetailPath = (taskId: string) => `${taskPath}/${taskId}`;
export const taskEditPath = (taskId: string) => `${taskPath}/${taskId}/edit`;

export const signUpPath = "/sign-up";
export const signInPath = "/sign-in";
export const passwordForgotPath = "/password-forgot";
