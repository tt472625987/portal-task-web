"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { setCookieByKey } from "@/actions/cookies";
import { formErrorToActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { taskPath } from "@/paths";

export const deleteTask = async (taskId: string) => {
  try {
    await prisma.task.delete({
      where: { id: taskId },
    });
  } catch (error) {
    return formErrorToActionState(error);
  }

  await setCookieByKey("toast", "Task Delete successfully");

  revalidatePath(taskPath);
  redirect(taskPath);
};
