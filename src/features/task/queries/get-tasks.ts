import { prisma } from "@/lib/prisma";
// import { initialTasks } from "@/data";

// import type { Task } from "../type";

// export const getTasks = async (): Promise<Task[]> => {
//   await new Promise((resolve) => setTimeout(resolve, 2000));

//   throw new Error("Failed to fetch tasks");

//   return new Promise((resolve) => {
//     resolve(initialTasks);
//   });
// };

export const getTasks = async () => {
  return await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};
