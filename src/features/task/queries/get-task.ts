// import { initialTasks } from "@/data";

// import { Task } from "../type";

// export const getTask = async (taskId: string): Promise<Task | null> => {
//   // await new Promise((resolve) => setTimeout(resolve, 2000));

//   const maybeTask = initialTasks.find((task) => task.id === taskId);

//   return new Promise((resolve) => {
//     return resolve(maybeTask || null);
//   });
// };
import { cache } from "react";

import { prisma } from "@/lib/prisma";

export const getTask = cache(async (taskId: string) => {
  return await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
});
