"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { setCookieByKey } from "@/actions/cookies";
import { formErrorToActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { taskPath } from "@/paths";

export const deleteTask = async (taskId: string) => {
  const { user } = await getAuthOrRedirect();

  try {
    if (taskId) {
      const task = await prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!task || !isOwner(user, task)) {
        return formErrorToActionState("Not authorized");
      }
    }

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
