"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { setCookieByKey } from "@/actions/cookies";
import { Prisma } from "@/lib/prisma";
import { taskPath } from "@/paths";

export const deleteTask = async (taskId: string) => {
  await Prisma.task.delete({
    where: { id: taskId },
  });
  await setCookieByKey("toast", "Task Delete successfully");

  revalidatePath(taskPath);
  redirect(taskPath);
};
