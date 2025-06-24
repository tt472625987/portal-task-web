"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Prisma } from "@/lib/prisma";
import { taskPath } from "@/paths";

export const deleteTask = async (taskId: string) => {
  await Prisma.task.delete({
    where: { id: taskId },
  });

  revalidatePath(taskPath)
  redirect(taskPath)
};
